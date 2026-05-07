begin;

create extension if not exists pgcrypto;
create extension if not exists citext;

do $$ begin
  create type public.user_role as enum ('user', 'author', 'editor', 'admin');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.article_status as enum ('draft', 'pending_review', 'approved', 'rejected');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.content_language as enum ('en', 'az', 'ru');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.comment_status as enum ('visible', 'hidden', 'removed');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.report_status as enum ('open', 'reviewed', 'dismissed');
exception when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  username citext unique,
  avatar_url text,
  bio text,
  university text,
  workplace text,
  role public.user_role not null default 'user',
  interests text[] not null default '{}',
  social_links jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_username_format check (username is null or username ~ '^[a-z0-9_]{3,32}$')
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  subtitle text,
  abstract text not null,
  content text not null,
  cover_image_url text,
  language public.content_language not null default 'en',
  author_id uuid not null references public.profiles(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  status public.article_status not null default 'draft',
  rejection_reason text,
  views_count integer not null default 0 check (views_count >= 0),
  likes_count integer not null default 0 check (likes_count >= 0),
  reading_time integer not null default 1 check (reading_time >= 1),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  search_vector tsvector generated always as (
    setweight(to_tsvector('simple', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(subtitle, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(abstract, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(content, '')), 'C')
  ) stored
);

alter table if exists public.articles
  add column if not exists language public.content_language not null default 'en';

create table if not exists public.article_tags (
  article_id uuid not null references public.articles(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (article_id, tag_id)
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  status public.comment_status not null default 'visible',
  created_at timestamptz not null default now()
);

create table if not exists public.likes (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (article_id, user_id)
);

create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (article_id, user_id)
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  reason text not null,
  status public.report_status not null default 'open',
  created_at timestamptz not null default now(),
  unique (article_id, user_id)
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email citext not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email citext not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists articles_status_published_idx on public.articles (status, published_at desc);
create index if not exists articles_author_idx on public.articles (author_id, updated_at desc);
create index if not exists articles_category_idx on public.articles (category_id);
create index if not exists articles_language_idx on public.articles (language);
create index if not exists articles_search_idx on public.articles using gin (search_vector);
create index if not exists comments_article_idx on public.comments (article_id, created_at);
create index if not exists reports_status_idx on public.reports (status, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_articles_updated_at on public.articles;
create trigger set_articles_updated_at
before update on public.articles
for each row execute function public.set_updated_at();

create or replace function public.current_user_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select role from public.profiles where id = auth.uid()), 'user'::public.user_role);
$$;

create or replace function public.has_role(allowed_roles public.user_role[])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_user_role() = any(allowed_roles);
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, username, avatar_url)
  values (
    new.id,
    nullif(new.raw_user_meta_data ->> 'full_name', ''),
    nullif(new.raw_user_meta_data ->> 'username', ''),
    nullif(new.raw_user_meta_data ->> 'avatar_url', '')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.prevent_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role and not public.has_role(array['admin']::public.user_role[]) then
    raise exception 'Only admins can change user roles.';
  end if;

  return new;
end;
$$;

drop trigger if exists prevent_role_escalation_trigger on public.profiles;
create trigger prevent_role_escalation_trigger
before update on public.profiles
for each row execute function public.prevent_role_escalation();

create or replace function public.enforce_article_workflow()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status = 'approved' and (tg_op = 'INSERT' or old.status is distinct from new.status) then
    if auth.uid() is not null and new.author_id = auth.uid() then
      raise exception 'Authors cannot approve their own articles.';
    end if;

    if not public.has_role(array['editor', 'admin']::public.user_role[]) then
      raise exception 'Only editors or admins can approve articles.';
    end if;

    new.published_at = coalesce(new.published_at, now());
    new.rejection_reason = null;
  end if;

  if new.status = 'rejected' and (tg_op = 'INSERT' or old.status is distinct from new.status) then
    if not public.has_role(array['editor', 'admin']::public.user_role[]) then
      raise exception 'Only editors or admins can reject articles.';
    end if;
    new.published_at = null;
  end if;

  if new.status in ('draft', 'pending_review') then
    new.published_at = null;
  end if;

  return new;
end;
$$;

drop trigger if exists enforce_article_workflow_trigger on public.articles;
create trigger enforce_article_workflow_trigger
before insert or update on public.articles
for each row execute function public.enforce_article_workflow();

create or replace function public.refresh_article_likes_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.articles
  set likes_count = (
    select count(*)::integer
    from public.likes
    where article_id = coalesce(new.article_id, old.article_id)
  )
  where id = coalesce(new.article_id, old.article_id);

  return coalesce(new, old);
end;
$$;

drop trigger if exists likes_refresh_after_insert on public.likes;
create trigger likes_refresh_after_insert
after insert on public.likes
for each row execute function public.refresh_article_likes_count();

drop trigger if exists likes_refresh_after_delete on public.likes;
create trigger likes_refresh_after_delete
after delete on public.likes
for each row execute function public.refresh_article_likes_count();

create or replace function public.increment_article_views(article_slug text)
returns void
language sql
security definer
set search_path = public
as $$
  update public.articles
  set views_count = views_count + 1
  where slug = article_slug and status = 'approved';
$$;

grant execute on function public.increment_article_views(text) to anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'article-covers',
  'article-covers',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

commit;
