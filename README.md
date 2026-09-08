# Vivienne Shork

Private letters for Vivienne. She opens the site, picks a prompt, and reads that one letter. Achilles writes and publishes them from `/admin`.

Reader: `/` and `/letters/[slug]`. Admin: `/admin`. The reader can sit behind a shared passphrase (`SITE_PASSWORD`). Search engines are told not to index.

## Stack

Next.js (App Router), TypeScript, Tailwind, shadcn/ui, Supabase (Postgres + Auth). Deploy on Vercel.

## Setup

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SITE_PASSWORD` | Reader passphrase. Leave empty to skip the gate locally. |
| `ADMIN_EMAIL` | The only email allowed to use `/admin` |

Then create a free [Supabase](https://supabase.com) project and, in the SQL editor, run `supabase/setup.sql` (or `schema.sql` then `rls.sql`).

In the Supabase dashboard:

1. Disable public sign-ups.
2. Create one Auth user whose email matches `ADMIN_EMAIL`.
3. Copy the project URL and anon key into `.env.local`. Do not put the service role key in the client env.

Write letters in `/admin`. Unpublished rows stay hidden from the reader.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin is at `/admin/login`.

## Deploy

Vercel, Next.js defaults. Set the same four env vars on the project. Add the Vercel domain to Supabase Auth redirect URLs.

Do not commit `.env.local` or letter bodies.
