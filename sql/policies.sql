begin;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.articles enable row level security;
alter table public.article_tags enable row level security;
alter table public.comments enable row level security;
alter table public.likes enable row level security;
alter table public.bookmarks enable row level security;
alter table public.reports enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "Profiles are publicly readable" on public.profiles;
create policy "Profiles are publicly readable"
on public.profiles for select
using (true);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
on public.profiles for insert
with check (id = auth.uid());

drop policy if exists "Users can update own profile without role escalation" on public.profiles;
create policy "Users can update own profile without role escalation"
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid() and role = public.current_user_role());

drop policy if exists "Admins can manage all profiles" on public.profiles;
create policy "Admins can manage all profiles"
on public.profiles for all
using (public.has_role(array['admin']::public.user_role[]))
with check (public.has_role(array['admin']::public.user_role[]));

drop policy if exists "Categories are publicly readable" on public.categories;
create policy "Categories are publicly readable"
on public.categories for select
using (true);

drop policy if exists "Admins manage categories" on public.categories;
create policy "Admins manage categories"
on public.categories for all
using (public.has_role(array['admin']::public.user_role[]))
with check (public.has_role(array['admin']::public.user_role[]));

drop policy if exists "Tags are publicly readable" on public.tags;
create policy "Tags are publicly readable"
on public.tags for select
using (true);

drop policy if exists "Authenticated users can create tags" on public.tags;
create policy "Authenticated users can create tags"
on public.tags for insert
with check (auth.role() = 'authenticated');

drop policy if exists "Admins manage tags" on public.tags;
create policy "Admins manage tags"
on public.tags for all
using (public.has_role(array['admin']::public.user_role[]))
with check (public.has_role(array['admin']::public.user_role[]));

drop policy if exists "Approved articles are public" on public.articles;
create policy "Approved articles are public"
on public.articles for select
using (status = 'approved');

drop policy if exists "Authors can read own articles" on public.articles;
create policy "Authors can read own articles"
on public.articles for select
using (author_id = auth.uid());

drop policy if exists "Editors can read all articles" on public.articles;
create policy "Editors can read all articles"
on public.articles for select
using (public.has_role(array['editor', 'admin']::public.user_role[]));

drop policy if exists "Authenticated users can create own unapproved articles" on public.articles;
create policy "Authenticated users can create own unapproved articles"
on public.articles for insert
with check (
  auth.role() = 'authenticated'
  and author_id = auth.uid()
  and status in ('draft', 'pending_review')
);

drop policy if exists "Authors can edit own pre-publication articles" on public.articles;
create policy "Authors can edit own pre-publication articles"
on public.articles for update
using (
  author_id = auth.uid()
  and status in ('draft', 'pending_review', 'rejected')
)
with check (
  author_id = auth.uid()
  and status in ('draft', 'pending_review')
);

drop policy if exists "Editors can update editorial workflow" on public.articles;
create policy "Editors can update editorial workflow"
on public.articles for update
using (public.has_role(array['editor', 'admin']::public.user_role[]))
with check (public.has_role(array['editor', 'admin']::public.user_role[]));

drop policy if exists "Authors can delete own drafts" on public.articles;
create policy "Authors can delete own drafts"
on public.articles for delete
using (author_id = auth.uid() and status in ('draft', 'rejected'));

drop policy if exists "Admins can delete articles" on public.articles;
create policy "Admins can delete articles"
on public.articles for delete
using (public.has_role(array['admin']::public.user_role[]));

drop policy if exists "Article tags are public" on public.article_tags;
create policy "Article tags are public"
on public.article_tags for select
using (true);

drop policy if exists "Authors manage tags on own editable articles" on public.article_tags;
create policy "Authors manage tags on own editable articles"
on public.article_tags for all
using (
  exists (
    select 1 from public.articles
    where articles.id = article_tags.article_id
      and articles.author_id = auth.uid()
      and articles.status in ('draft', 'pending_review', 'rejected')
  )
)
with check (
  exists (
    select 1 from public.articles
    where articles.id = article_tags.article_id
      and articles.author_id = auth.uid()
      and articles.status in ('draft', 'pending_review', 'rejected')
  )
);

drop policy if exists "Editors manage all article tags" on public.article_tags;
create policy "Editors manage all article tags"
on public.article_tags for all
using (public.has_role(array['editor', 'admin']::public.user_role[]))
with check (public.has_role(array['editor', 'admin']::public.user_role[]));

drop policy if exists "Visible comments are public" on public.comments;
create policy "Visible comments are public"
on public.comments for select
using (status = 'visible');

drop policy if exists "Users can read own comments" on public.comments;
create policy "Users can read own comments"
on public.comments for select
using (user_id = auth.uid());

drop policy if exists "Authenticated users can comment on approved articles" on public.comments;
create policy "Authenticated users can comment on approved articles"
on public.comments for insert
with check (
  auth.role() = 'authenticated'
  and user_id = auth.uid()
  and exists (
    select 1 from public.articles
    where articles.id = comments.article_id and articles.status = 'approved'
  )
);

drop policy if exists "Users can delete own comments" on public.comments;
create policy "Users can delete own comments"
on public.comments for delete
using (user_id = auth.uid());

drop policy if exists "Editors moderate comments" on public.comments;
create policy "Editors moderate comments"
on public.comments for all
using (public.has_role(array['editor', 'admin']::public.user_role[]))
with check (public.has_role(array['editor', 'admin']::public.user_role[]));

drop policy if exists "Users read own likes" on public.likes;
create policy "Users read own likes"
on public.likes for select
using (user_id = auth.uid() or public.has_role(array['editor', 'admin']::public.user_role[]));

drop policy if exists "Users like approved articles once" on public.likes;
create policy "Users like approved articles once"
on public.likes for insert
with check (
  auth.role() = 'authenticated'
  and user_id = auth.uid()
  and exists (
    select 1 from public.articles
    where articles.id = likes.article_id and articles.status = 'approved'
  )
);

drop policy if exists "Users delete own likes" on public.likes;
create policy "Users delete own likes"
on public.likes for delete
using (user_id = auth.uid());

drop policy if exists "Users read own bookmarks" on public.bookmarks;
create policy "Users read own bookmarks"
on public.bookmarks for select
using (user_id = auth.uid() or public.has_role(array['editor', 'admin']::public.user_role[]));

drop policy if exists "Users bookmark approved articles once" on public.bookmarks;
create policy "Users bookmark approved articles once"
on public.bookmarks for insert
with check (
  auth.role() = 'authenticated'
  and user_id = auth.uid()
  and exists (
    select 1 from public.articles
    where articles.id = bookmarks.article_id and articles.status = 'approved'
  )
);

drop policy if exists "Users delete own bookmarks" on public.bookmarks;
create policy "Users delete own bookmarks"
on public.bookmarks for delete
using (user_id = auth.uid());

drop policy if exists "Users can report approved articles" on public.reports;
create policy "Users can report approved articles"
on public.reports for insert
with check (
  auth.role() = 'authenticated'
  and user_id = auth.uid()
  and exists (
    select 1 from public.articles
    where articles.id = reports.article_id and articles.status = 'approved'
  )
);

drop policy if exists "Users read own reports" on public.reports;
create policy "Users read own reports"
on public.reports for select
using (user_id = auth.uid() or public.has_role(array['editor', 'admin']::public.user_role[]));

drop policy if exists "Editors update reports" on public.reports;
create policy "Editors update reports"
on public.reports for update
using (public.has_role(array['editor', 'admin']::public.user_role[]))
with check (public.has_role(array['editor', 'admin']::public.user_role[]));

drop policy if exists "Admins delete reports" on public.reports;
create policy "Admins delete reports"
on public.reports for delete
using (public.has_role(array['admin']::public.user_role[]));

drop policy if exists "Anyone can subscribe to newsletter" on public.newsletter_subscribers;
create policy "Anyone can subscribe to newsletter"
on public.newsletter_subscribers for insert
with check (true);

drop policy if exists "Admins read newsletter subscribers" on public.newsletter_subscribers;
create policy "Admins read newsletter subscribers"
on public.newsletter_subscribers for select
using (public.has_role(array['admin']::public.user_role[]));

drop policy if exists "Admins delete newsletter subscribers" on public.newsletter_subscribers;
create policy "Admins delete newsletter subscribers"
on public.newsletter_subscribers for delete
using (public.has_role(array['admin']::public.user_role[]));

drop policy if exists "Anyone can send contact messages" on public.contact_messages;
create policy "Anyone can send contact messages"
on public.contact_messages for insert
with check (true);

drop policy if exists "Editors read contact messages" on public.contact_messages;
create policy "Editors read contact messages"
on public.contact_messages for select
using (public.has_role(array['editor', 'admin']::public.user_role[]));

drop policy if exists "Admins delete contact messages" on public.contact_messages;
create policy "Admins delete contact messages"
on public.contact_messages for delete
using (public.has_role(array['admin']::public.user_role[]));

drop policy if exists "Article cover images are public" on storage.objects;
create policy "Article cover images are public"
on storage.objects for select
using (bucket_id = 'article-covers');

drop policy if exists "Users upload own article covers" on storage.objects;
create policy "Users upload own article covers"
on storage.objects for insert
with check (
  bucket_id = 'article-covers'
  and auth.role() = 'authenticated'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users update own article covers" on storage.objects;
create policy "Users update own article covers"
on storage.objects for update
using (
  bucket_id = 'article-covers'
  and (
    (storage.foldername(name))[1] = auth.uid()::text
    or public.has_role(array['admin']::public.user_role[])
  )
)
with check (
  bucket_id = 'article-covers'
  and (
    (storage.foldername(name))[1] = auth.uid()::text
    or public.has_role(array['admin']::public.user_role[])
  )
);

drop policy if exists "Users delete own article covers" on storage.objects;
create policy "Users delete own article covers"
on storage.objects for delete
using (
  bucket_id = 'article-covers'
  and (
    (storage.foldername(name))[1] = auth.uid()::text
    or public.has_role(array['admin']::public.user_role[])
  )
);

commit;
