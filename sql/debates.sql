create extension if not exists "pgcrypto";

create table if not exists public.article_debate_entries (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  side text not null check (side in ('agree', 'disagree')),
  argument text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(article_id, user_id)
);

alter table public.article_debate_entries enable row level security;

drop policy if exists "Anyone can read article debate entries" on public.article_debate_entries;
create policy "Anyone can read article debate entries"
on public.article_debate_entries
for select
using (true);

drop policy if exists "Authenticated users can create debate entries" on public.article_debate_entries;
create policy "Authenticated users can create debate entries"
on public.article_debate_entries
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own debate entries" on public.article_debate_entries;
create policy "Users can update own debate entries"
on public.article_debate_entries
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete own debate entries" on public.article_debate_entries;
create policy "Users can delete own debate entries"
on public.article_debate_entries
for delete
to authenticated
using (auth.uid() = user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists article_debate_entries_set_updated_at on public.article_debate_entries;

create trigger article_debate_entries_set_updated_at
before update on public.article_debate_entries
for each row
execute function public.set_updated_at();

create index if not exists article_debate_entries_article_id_idx
on public.article_debate_entries(article_id);

create index if not exists article_debate_entries_created_at_idx
on public.article_debate_entries(created_at desc);
