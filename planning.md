# Vivienne Shork — Planning Prompt

Use this file as the source of truth for planning and later implementation. Do not start coding until the user asks to build. This chat and this document are planning-only unless the user says otherwise.

If you are an AI reading this file: follow these decisions, do not reopen settled stack choices without a strong reason, and ask before adding paid services or a native mobile app.

---

## Project

- **Name:** Vivienne Shork
- **Workspace:** empty greenfield project
- **What it is:** a private collection of letters Achilles wrote for Vivienne. She does not browse a blog. She picks a moment — “Read this when you are tired” — and opens **that one letter**.
- **How she picks:** each letter is 1:1 with a prompt. The home screen **is** the list of prompts. Tap a prompt → read that letter. There is no second step of “letters tagged sad.”
- **Who writes:** Achilles (admin). Easy CRUD: add new “Read this when…” letters, edit bodies, publish/unpublish, reorder, delete — without a redeploy.
- **Who reads:** Vivienne (no account). She only sees **published** letters.
- **Deploy:** Vercel Hobby (free). Personal / non-commercial. Fits Hobby terms.
- **Form factor:** responsive web app (phone + desktop), one URL, one codebase. Not a native app.

---

## Reader UX (keep it simple)

Two screens only. No nav, no search, no splash-then-home.

```
Open site
  → Home: greeting + title cards
      → tap a card
          → that letter
              → back
                  → same home
```

### Screen 1 — Home

One page, top to bottom:

1. **Greeting** — her name, quiet. Default copy:  
   **Hi, Vivienne.**  
   Optional second line (default on): **Pick what you need.**
2. **Cards** — one published letter per card. Card text = full `label` (“Read this when you are tired”). Large tap target. Order = `sort_order`.

Greeting and cards stay on the **same** screen. Do not make her tap through a welcome screen to reach the list.

If nothing is published yet: still show the greeting, plus a gentle empty line (e.g. “I’m still writing these.”). No error chrome.

### Screen 2 — Letter

- Top: back control that returns home (not browser-only; she needs an on-page back)
- Title: the same card label
- Body: markdown, comfortable reading type
- Nothing else (no share, no “next letter”, no comments)

### What not to build in the reader

- Bottom tabs, sidebars, “all letters” as a second index
- Filters, tags, search
- Separate feelings taxonomy
- Animations that delay the letter
- Time-of-day or rotating greetings in v1 (easy to add later; keep copy stable first)

If two letters ever share a mood, that is a **new card** with its own prompt, not a tag.

---

## UX discussion (defaults in bold)

These are the only reader choices still worth picking. Everything else stays plain.

| Topic | Options | Recommendation |
|---|---|---|
| Greeting | Static **“Hi, Vivienne.”** vs time-of-day (“Good morning, Vivienne”) | **Static.** Time-of-day is a one-line add later if it feels cold. |
| Subline | **“Pick what you need.”** vs no subline vs “Read this when…” | **Keep a short subline.** The cards already say “Read this when…” |
| Card text | **Full sentence** vs short (“you are tired”) under a shared heading | **Full sentence.** Matches how the letters were named. |
| Home layout | **1 column everywhere** vs 2 columns from `md:` | **1 column, centered, max-width ~36rem.** Feels like a note, not a dashboard. 15 cards may scroll; that is fine. |
| Letter width | **~60–70ch serif** vs matching the card column | **Slightly narrower than a blog, serif body.** Cards can be a bit wider than the letter. |
| After reading | **Back to home** vs swipe to another letter | **Back to home.** She chose a feeling on purpose; don’t shuffle her. |
| Passphrase (if on) | One password field, then home | Gate is not a third “product.” After unlock, home as above. |

Admin UX stays a normal list + form. It does not need to match the reader’s tone beyond being usable on a phone.

---

## v1 letter catalog (seed these)

Seed **all 15** as rows in the database, in this order (`sort_order` 1–15). Bodies start empty (or a private draft placeholder). `published = false` until Achilles writes and publishes each one. Vivienne must not see empty shells.

| sort | label (card + page title) | slug |
|---|---|---|
| 1 | Read this when you are tired | `tired` |
| 2 | Read this when you miss me | `miss-me` |
| 3 | Read this when you want to quit | `want-to-quit` |
| 4 | Read this when you are stressed | `stressed` |
| 5 | Read this when you feel alone | `feel-alone` |
| 6 | Read this when you cannot sleep | `cannot-sleep` |
| 7 | Read this when you are proud | `proud` |
| 8 | Read this when you are hungry | `hungry` |
| 9 | Read this when you are sad | `sad` |
| 10 | Read this when you need to smile | `need-to-smile` |
| 11 | Read this when you feel overwhelmed | `overwhelmed` |
| 12 | Read this when you finish working | `finish-working` |
| 13 | Read this when you doubt yourself | `doubt-yourself` |
| 14 | Read this when you wake up early | `wake-up-early` |
| 15 | Read this when you need a break | `need-a-break` |

Admin may add more later in the same voice (“Read this when…”). New letters are extra rows, not code changes.

Letter **bodies are not in git**. Only labels/slugs may be seeded in SQL. Real text is entered in `/admin` (or Supabase Table Editor).

---

## Product principles

1. Tender and private for Vivienne; practical and fast to edit for Achilles.
2. Simple reader: greeting, then cards, then the letter. Nothing else on her side.
3. One codebase, one deploy, works on mobile and web.
4. Stay inside Vercel Hobby and other **free** tiers (Supabase free tier included).
5. Letters live in a **database**. Editing must not require a commit or rebuild.
6. Intimate content: do not SEO-index, do not treat this like a public blog.
7. No paid Vercel add-ons, no native app, no extra frameworks unless the user asks.

---

## Settled tech stack

Use this stack. Do not substitute without asking.

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js (App Router)** | Routing, SSR, Server Actions for CRUD, Vercel-native |
| Language | **TypeScript** | Required |
| Styling | **Tailwind CSS** | Mobile-first |
| UI | **shadcn/ui** | Forms for admin; softer custom chrome for the reader |
| Icons | **lucide-react** | Pairs with shadcn |
| Forms | **React Hook Form + Zod** | Admin letter form |
| Letter body | **Markdown** in a textarea, rendered on the read page | Easy to edit; no heavy WYSIWYG in v1 |
| Images / fonts | **`next/image`**, **`next/font`** | Fast on mobile; keep images rare |
| Database + auth | **Supabase** (Postgres + Auth + Table Editor) | Dynamic data, RLS, dashboard CRUD as a backup |
| Mutations | **Next.js Server Actions** | In-app CRUD without a separate API server |
| Deploy | **Vercel Hobby** | Git push → HTTPS + CDN |
| Package manager | **npm** unless the repo already uses something else | Keep it simple |

**Optional later (not v1 unless asked):**

- PWA (home-screen install) — after the site feels solid
- Rich text / image uploads in letters
- “Mark as read”, favorites, or comments from Vivienne
- Tagging one letter to multiple moods
- Zustand or similar — only if RSC + search params are not enough

---

## Two surfaces

Treat these as different UIs sharing one table.

### Reader (Vivienne)

Soft, unhurried, phone-first. No dashboard chrome, no “CMS” language. Follow **Reader UX** above.

1. **Home (`/`)** — greeting + published title cards.
2. **Letter (`/letters/[slug]`)** — that card’s letter. On-page back to home.
3. **Unknown / unpublished slug** — soft not-found. Do not leak that a draft exists.

She never sees unpublished letters, admin controls, or Supabase.

### Admin (Achilles)

Utilitarian, still usable on a phone. Behind login.

1. **Login** — Supabase Auth (email + password or magic link). Only Achilles’ email is allowed.
2. **Letters list** — all 15+ rows, published/draft, search by label, reorder.
3. **Letter create / edit** — label, slug (editable on create; careful on edit), markdown body, preview, published toggle, sort order, optional `written_at`.
4. **Delete** — confirm. Prefer unpublish over delete for the original 15 unless he means it.

Backup: the **Supabase Table Editor** is a valid emergency CRUD path. The in-app admin is the everyday path.

---

## Data model (Supabase / Postgres)

One table. UUIDs. RLS on.

### `letters`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid pk | |
| `slug` | text unique | URL, e.g. `tired` |
| `label` | text | Exact picker text, e.g. `Read this when you are tired` |
| `body` | text | Markdown; may be empty while drafting |
| `published` | boolean default false | Drafts hidden from Vivienne |
| `sort_order` | int | Home order |
| `written_at` | date nullable | Optional |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

**No `feelings` table. No `letter_feelings` join.** v1 is 1 letter = 1 prompt.

**Rules**

- Reader query: `published = true`, order by `sort_order`, then `label`.
- Published letters should have a non-empty `body` (enforce in the admin publish action).
- Unique `slug` and unique `label`.
- Do not store which prompts Vivienne opened.

### RLS (required)

- **Anon / reader:** `SELECT` on `letters` where `published = true` only. No insert/update/delete.
- **Authenticated admin (Achilles only):** full CRUD on `letters`.
- Disable public Auth sign-ups; create one user in the Supabase dashboard. Also check `ADMIN_EMAIL` in Server Actions.

---

## Auth and privacy

This is private correspondence. Default to **quiet**, not public.

| Actor | Access |
|---|---|
| Vivienne | No login. Reads published letters only. |
| Achilles | Supabase Auth. Admin routes under `/admin`. |
| Strangers / Google | Should not index or casually browse. |

**v1 privacy defaults**

- `robots.txt` disallow all; letter pages `noindex`.
- **Shared passphrase gate** (env `SITE_PASSWORD`) in front of the reader app so the URL is not enough. Confirm the password at build time (never commit it).
- No public sitemap. No Open Graph previews that leak letter bodies.
- Service role key stays server-only. Never expose it to the client.

Admin session: cookie via `@supabase/ssr`. Protect `/admin/*` in middleware: unauthenticated users go to `/admin/login`.

---

## Routes

```
/                         # greeting + title cards
/letters/[slug]           # read one letter
/admin/login
/admin                    # letters list
/admin/letters/new
/admin/letters/[id]       # edit
```

No `/feelings/*`. Passphrase gate wraps reader routes only (not `/admin`).

---

## Mobile + web UX (required)

This is a **responsive website**, not React Native.

**Phone (reader)**

- Same layout as desktop, just narrower: greeting, then a **single column** of cards
- Cards: full title, 44px+ tap targets, generous padding
- No bottom nav. No top app bar on home (greeting is the header)
- Letter: on-page back, `100dvh`, `env(safe-area-inset-*)`
- No hover-only actions

**Desktop (reader, `md:` and up)**

- Still **one centered column** (home max-width ~36rem; letter ~60–70ch)
- Do not switch to a multi-column card grid unless the user asks — it reads as a dashboard
- Hover as extra (subtle card lift), not required to understand the UI

**Admin**

- Must work on phone
- shadcn list + form is fine
- Nav: Letters · New · Log out

---

## Suggested project shape

```
app/
  layout.tsx
  page.tsx                      # greeting + cards
  letters/[slug]/page.tsx
  admin/
    layout.tsx                  # requires auth
    login/page.tsx
    page.tsx                    # letters list
    letters/new/page.tsx
    letters/[id]/page.tsx
  robots.ts
components/
  ui/                           # shadcn
  reader/                       # prompt cards, letter article
  admin/                        # table, letter form
lib/
  supabase/
    client.ts
    server.ts
  letters.ts                    # queries
  markdown.ts                   # render markdown safely
  auth.ts
supabase/
  seed.sql                      # 15 labels/slugs only, empty bodies, unpublished
public/
planning.md
ui-ux.md                         # visual source of truth (picnic / flowers / letters)
```

Build on Vercel: `npm run build`. Env vars on Vercel + local `.env.local` (gitignored):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SITE_PASSWORD`
- `ADMIN_EMAIL`

Do not commit secrets. Do not put letter bodies in git.

---

## Caching / Hobby

Letters change when Achilles saves. Do **not** bake letter bodies into a fully static export.

- Reader pages: **SSR** (or short ISR) from Supabase so a save shows up without a redeploy.
- Traffic is one person; SSR cost on Hobby is fine. Do not add Redis.
- After admin save, `revalidatePath` for `/` and `/letters/[slug]`.
- No cron, no background jobs, no realtime subscriptions in v1.

---

## Vercel Hobby + Supabase free constraints

- Personal use only on Vercel Hobby.
- Prefer Server Actions over a swarm of `/api` files.
- No image-heavy editor; if a letter needs a picture later, ask.
- Supabase free: enough for this archive. Pause-after-inactivity on free projects — first load after a quiet week may be slow; do not “fix” with a paid plan unless asked.

If a feature needs Vercel Pro or a paid Supabase tier, **stop and ask**.

---

## Explicitly out of scope (v1)

Do not add these unless the user asks:

- Extra reader screens (splash, about, browse-all, next-letter)
- Feelings table, tags, or “multiple letters per mood”
- Bottom navigation or a reader sidebar
- Native iOS/Android, PWA, Vite SPA, Flutter, WordPress, a second CMS
- Payments, comments, chat, email notifications
- Vivienne accounts, read receipts, analytics on which letter she opened
- WYSIWYG / Notion-like editor
- Storing letter bodies as files in the repo
- Public SEO, social share cards with letter text
- Team auth, multiple writers

---

## Implementation rules (when the user says to build)

1. Read this file first. Follow settled decisions.
2. TypeScript + App Router + Tailwind + shadcn + Supabase only.
3. Seed the 15 catalog rows unpublished with empty bodies. Admin CRUD must be enough to write and publish them.
4. Mobile-first. Verify phone and desktop for **both** reader and admin.
5. Do not introduce new major libraries without asking. Markdown: a small renderer (e.g. `react-markdown`) is allowed.
6. Do not commit, push, or create a Vercel/Supabase project unless asked. You may scaffold local code and SQL.
7. Keep this `planning.md` updated if decisions change.

---

## Open questions (nice to have, not blockers)

Reader structure is settled (greeting + cards + letter). Visual tone is settled in `ui-ux.md`. Remaining:

1. **Passphrase gate** — yes or no? (Default: **yes**.)
2. **Greeting copy** — keep **“Hi, Vivienne.” / “Pick what you need.”** or write something else?
3. **Custom domain** now or `*.vercel.app` first? (Default: Vercel URL first.)
4. **Letter images** in v1? (Default: **no**, markdown text only.)

---

## Implementation prompts

Detailed copy-paste prompts live in `prompts.md`. Use one numbered prompt per chat. `@planning.md` `@ui-ux.md` `@prompts.md`.

For a later implementation chat, prefer Prompt 1 in `prompts.md` (not a one-shot) unless the user asks for Prompt B.

---

## Decision log

| Date | Decision |
|---|---|
| 2026-09-07 | Planning-only. Empty repo. Stack: Next.js App Router, TS, Tailwind, shadcn/ui, lucide, Vercel Hobby. Responsive web, not native. |
| 2026-09-07 | Product: letters for Vivienne, written by Achilles. **Supabase**. Markdown. Reader has no account; Achilles is the only admin. Privacy: noindex, passphrase gate (default on). SSR so edits appear without redeploy. |
| 2026-09-07 | Picker model simplified: **1 prompt = 1 letter**. Drop feelings / join tables. Home lists published labels; tap opens that letter. v1 catalog is the 15 “Read this when…” titles (seed unpublished). Admin can add more rows in the same pattern. |
| 2026-09-07 | Reader UX locked simple: **greeting + cards on one home screen**, click card, read letter, back. No splash, no bottom nav, no second index. Default greeting “Hi, Vivienne.” / “Pick what you need.” One centered column on phone and desktop. |
| 2026-09-07 | Visual tone settled in `ui-ux.md`: picnic vibes, flowers and letters, cutesy stationery. Reader is decorated; admin shares tokens but stays quiet. |
| 2026-09-07 | Sharks are a first-class cute motif (round shork + daisy), not an ocean theme. Favicon, wordmark, some card stickers, letter seal, empty/not-found. See `ui-ux.md`. |
