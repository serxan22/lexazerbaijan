# LexAzerbaijan

A modern legal article platform for Azerbaijan's young legal community, built with Next.js App Router, TypeScript, Tailwind CSS, shadcn-style UI components, Lucide icons, and Supabase.

The project name is centralized in [config/site.ts](/Users/serxandi/Documents/Codex/2026-05-07/you-are-a-senior-full-stack-2/config/site.ts), so it can be renamed later from one place.

## Features

- Public legal journal homepage, article library, categories, author profiles, about, contact, and editorial policy pages
- Three-language interface for English, Azerbaijani, and Russian with a sticky language switcher and persistent locale cookie
- Article language metadata and reader filtering for `en`, `az`, and `ru` submissions
- Supabase Auth for signup, login, password reset, profile setup, and protected routes
- Article submission workflow: `draft`, `pending_review`, `approved`, `rejected`
- User dashboard with profile, submissions, status actions, and article statistics
- Admin dashboard for pending review, approve/reject, article edits, user roles, categories, reports, and platform stats
- Supabase PostgreSQL schema, triggers, storage bucket setup, and RLS policies
- Zod validation, slug generation, rich-text sanitization, XSS protection, and rate-limited server actions
- Responsive, premium legal journal UI using Tailwind, shadcn-style components, and Lucide icons

## Multilingual Setup

- The public UI dictionaries live in [lib/i18n.ts](/Users/serxandi/Documents/Codex/2026-05-07/you-are-a-senior-full-stack-2/lib/i18n.ts).
- Supported locales are configured in [lib/i18n-config.ts](/Users/serxandi/Documents/Codex/2026-05-07/you-are-a-senior-full-stack-2/lib/i18n-config.ts).
- Users switch language with the navbar language menu. The middleware stores the selected locale in `lexazerbaijan-locale`.
- Article submissions include an article language field so Azerbaijani, Russian, and English content can coexist and be filtered.

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase Setup

1. Create a Supabase project.
2. Copy your project URL and anon key into `.env.local`.
3. In the Supabase SQL editor, run these files in order:

```text
sql/schema.sql
sql/policies.sql
sql/seed.sql
```

4. In Supabase Auth settings, add redirect URLs:

```text
http://localhost:3000/auth/callback
https://your-domain.com/auth/callback
```

5. Confirm the `article-covers` storage bucket exists. The schema creates it automatically.

## Create First Admin

Sign up normally in the app, confirm the account, then run this in Supabase SQL editor:

```sql
update public.profiles
set role = 'admin'
where id = (select id from auth.users where email = 'you@example.com');
```

Then visit `/admin`.

## Security Notes

- Guests can read only approved public articles.
- Authenticated users can create their own draft or pending articles.
- Authors cannot directly set article status to approved.
- Editors/admins can approve or reject articles.
- A trigger prevents authors from approving their own articles.
- Users can update only their own profile and cannot escalate role.
- Admins manage users and categories.
- Likes and bookmarks are unique per user/article.
- Comments and reports are moderated by editors/admins.
- The Supabase service role key is not used by this app and must never be exposed in client-side environment variables.

Rate limiting is implemented in server actions with an in-memory limiter for article submissions, comments, contact, newsletter, and reports. For multi-region or high-traffic production deployments, swap [lib/rate-limit.ts](/Users/serxandi/Documents/Codex/2026-05-07/you-are-a-senior-full-stack-2/lib/rate-limit.ts) to Redis or Upstash without changing form contracts.

## Article Editor

The current editor is a clean textarea-based rich-text boundary in [components/forms/rich-text-editor.tsx](/Users/serxandi/Documents/Codex/2026-05-07/you-are-a-senior-full-stack-2/components/forms/rich-text-editor.tsx). Submissions are sanitized with `sanitize-html` before saving. A TipTap or Lexical editor can replace this component later while preserving the same `content` field.

## Vercel Deployment

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Add environment variables:

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

4. Deploy.
5. Add the production callback URL in Supabase Auth settings:

```text
https://your-domain.com/auth/callback
```

## Custom Domain

1. In Vercel, open Project Settings → Domains.
2. Add your domain.
3. Configure DNS as Vercel instructs, usually a `CNAME` for `www` and an `A` record or apex configuration for the root domain.
4. Update `NEXT_PUBLIC_SITE_URL` in Vercel to the final HTTPS domain.
5. Add the same domain callback URL in Supabase Auth.

## Useful Scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```

## Legal Disclaimer

Articles published on the platform are for educational and informational purposes only. They do not constitute legal advice, do not replace consultation with a qualified lawyer, and do not create a lawyer-client relationship.
# lexazerbaijan
