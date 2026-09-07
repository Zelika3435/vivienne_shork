# Vivienne Shork — Implementation Prompts

Copy **one prompt per chat** (or per agent run). Always attach or `@` these files in that chat:

- `planning.md` — product, stack, data, privacy, routes
- `ui-ux.md` — picnic look, type, sharks, copy, components
- this file — only the prompt you are running

**Conflict rules**

- Behavior, data, stack → `planning.md`
- Look and feel → `ui-ux.md`
- Home desktop layout → **`ui-ux.md`**: 2-column card grid (`md:+`), 3 only if cards stay large. (Planning’s one-column desktop note is superseded for visuals.)
- Home header → **`ui-ux.md`**: quiet wordmark + shork on home; greeting still on the same page as the cards. No bottom nav.

Do not start a later prompt until the earlier one is done, unless the prompt says it can run in parallel.

Do not commit letter bodies, `.env.local`, or service-role keys. Do not push or create a Vercel/Supabase project unless that prompt or the user says so.

---

## How to paste

In a new Cursor chat:

1. `@planning.md` `@ui-ux.md` `@prompts.md`
2. Paste **one** numbered prompt below (the whole block).
3. If you already built earlier steps, add: `The repo already has work from prompts 0–N. Do not scaffold from scratch. Continue from current files.`

---

## Prompt 0 — Picnic UI skill (optional, do first)

Use this once so later chats auto-follow the aesthetic.

```
Read ui-ux.md (section “Prompt for a UI/UX skill”) and planning.md.

Create a Cursor project skill at .cursor/skills/vivienne-picnic-ui/SKILL.md exactly as specified in that ui-ux.md block.

Do not implement the app. Only create the skill. Afterward, tell me the path of the files you added.
```

---

## Prompt 1 — Scaffold the Next.js app + picnic theme

```
Read planning.md and ui-ux.md. Implement only Prompt 1: project scaffold and picnic theme. Do not build reader pages with real data, admin, passphrase, or Supabase clients yet.

Goal: a running Next.js App Router + TypeScript + Tailwind app that already looks like picnic stationery, ready for later features.

Do this:

1. Scaffold Next.js (App Router, TypeScript, Tailwind, eslint, app/ directory) with npm in this repo. Keep planning.md, ui-ux.md, and prompts.md. Add a .gitignore that excludes .env*, node_modules, .next.

2. Install and init shadcn/ui (neutral/zinc base is fine as a starting point). Immediately remap colors to Picnic stationery CSS variables from ui-ux.md so the app does not stay default zinc. Add the tokens as CSS variables on :root (linen, paper, cream, kraft, wicker, sage, sage-deep, leaf, strawberry, blush, daisy, sky, pebble, ink, ink-soft, white). Wire Tailwind theme colors to those variables.

3. Load fonts with next/font (Google only): Fraunces (titles/wordmark), Lora (letter body — even if unused this prompt), Nunito (UI), Caveat (accent). No fifth family. Apply Nunito as the default UI font on body. Warm ink on linen. No dark mode. No pure black. No cool gray.

4. Root layout: PicnicShell-level page background (linen + very light gingham overlay per ui-ux.md), safe-area padding, metadata title “Vivienne Shork”, robots noindex/nofollow. Create app/robots.ts that disallows all.

5. Placeholder home page only: wordmark “Vivienne Shork” + tiny shork, greeting “Hi, Vivienne.” / “Pick what you need.”, and 2–3 static fake cards so we can see the theme. Fake cards must use PromptCard-like styling (paper, wicker border, rounded-2xl/3xl, cycling sticker). Links can be # for now.

6. Add public favicon / apple-touch: round shork face on cream. Not the Next.js default.

7. Add a first-pass ShorkMark SVG component (face + daisy pose at minimum) in the same line-art language as ui-ux.md (round, blush cheeks, pebble/sky fills, no teeth).

Acceptance:
- npm run build succeeds.
- Home on phone and desktop already reads as picnic (cream, sage, a flower, paper, a shark).
- No Supabase, no /admin, no passphrase, no markdown renderer yet.
- Do not add Framer Motion, extra icon packs, or photograph assets.

Verify in the browser at phone and desktop widths if tools exist. Do not commit unless I ask.
```

---

## Prompt 2 — Supabase schema, RLS, seed, and app clients

```
Read planning.md and ui-ux.md. The Next.js app from Prompt 1 already exists. Implement only Prompt 2: database + typed clients. Do not build CRUD UI or the real reader queries on pages yet (stubs are ok).

Do this:

1. Add supabase/schema.sql and supabase/seed.sql (and optional supabase/rls.sql if you split files).

schema.sql — table letters:
- id uuid pk default gen_random_uuid()
- slug text unique not null
- label text unique not null
- body text not null default ''
- published boolean not null default false
- sort_order int not null
- written_at date null
- created_at timestamptz not null default now()
- updated_at timestamptz not null default now()
Add an updated_at trigger. No feelings table. No joins.

rls:
- Enable RLS on letters.
- Anon: SELECT only where published = true.
- Authenticated: full CRUD (select/insert/update/delete).
- No anon insert/update/delete.

seed.sql — insert the 15 catalog rows from planning.md, sort_order 1–15, empty body, published = false. Do not invent letter text.

2. Add .env.example with:
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SITE_PASSWORD=
ADMIN_EMAIL=
Do not put real secrets in git. Do not use the service role key in the client. If a service role is needed later, server-only and gitignored.

3. Install @supabase/supabase-js and @supabase/ssr. Create lib/supabase/client.ts and lib/supabase/server.ts following current Supabase SSR cookie patterns for Next.js App Router.

4. Create lib/letters.ts with typed helpers (implementation can wait to be used):
- listPublishedLetters()
- getPublishedLetterBySlug(slug)
- listAllLetters() (admin)
- getLetterById(id) (admin)
Use the letters column names exactly. Order published lists by sort_order, then label.

5. Add a short supabase/README.md: create a free Supabase project, run schema + rls + seed in the SQL editor, disable public sign-ups, create one Auth user for Achilles, copy URL + anon key into .env.local. I will do those dashboard steps myself unless I ask you to.

Acceptance:
- SQL is complete and matches planning.md.
- App still builds. Pages may still use fake cards.
- No admin UI, no auth middleware, no passphrase yet.

Do not create a Supabase project or deploy unless I ask. Do not commit secrets.
```

---

## Prompt 3 — Reader home + letter page (real data)

```
Read planning.md and ui-ux.md. Scaffold and Supabase clients already exist. Implement only Prompt 3: Vivienne’s two screens with live published letters.

Reader rules:
- Two screens only: / and /letters/[slug]
- No bottom nav, no search, no tags, no “next letter”, no splash before the cards
- Home: wordmark + shork, then “Hi, Vivienne.” then “Pick what you need.” then published title cards
- Cards: full label, whole-card link, sticker cycle sort_order % 6 mixing flowers and sharks (not the same shork every card, not a mood color system)
- Empty published set: SoftEmpty — shork waiting with daisy + “Nothing to read just yet. Come back soon.”
- Letter page: BackLink (“Back to the picnic”) at top AND after the body; LetterSheet (paper, floral corners with peeking shork, Fraunces title, Lora markdown body 60–70ch / line-height 1.7–1.8, shork wax-seal); optional written_at in Caveat
- Unpublished or unknown slug: SoftNotFound — “That letter isn’t here.” + link home. Do not leak that a draft exists
- SSR (or equivalent dynamic) so new publishes show without a rebuild. Do not static-export letter bodies
- Markdown: react-markdown is allowed. Safe render; no raw HTML. Style like a letter, not a code blog. No typewriter.

Implement components from ui-ux.md as needed: PicnicShell, Wordmark, PromptCard, LetterSheet, BackLink, SoftEmpty, SoftNotFound, ShorkMark poses.

Desktop home: 2-column grid per ui-ux.md, centered, lots of blanket around it. Phone: one column. Tap targets ≥ 44px. Honor safe-area and 100dvh.

Motion: short fade/rise only; honor prefers-reduced-motion; no Framer Motion unless already there.

Copy: no CMS words on the reader (no posts, collection, moods, journal).

Acceptance:
- With seed data all unpublished, home shows the empty picnic state, not an error.
- If I publish one row in Supabase Table Editor, home shows that card and the letter page renders the body.
- Phone and desktop verified for home and letter.
- Still no /admin, no login, no passphrase.

Do not invent real love-letter copy. Empty or placeholder bodies stay empty.
```

---

## Prompt 4 — Passphrase gate + privacy chrome

```
Read planning.md and ui-ux.md. Reader pages already work. Implement only Prompt 4: shared passphrase for Vivienne, plus privacy hardening.

Behavior:
- Env SITE_PASSWORD. If unset or empty, skip the gate (so local/dev can work) but still keep noindex.
- Gate wraps reader routes only: / and /letters/*. Do not wrap /admin.
- After success, land on home. Cookie/session so she is not prompted every click. Do not add a welcome modal.
- One password field, sage submit labeled like “Come in” or “Open” per ui-ux.md. Error: “That passphrase isn’t right”
- GateCard: kraft/paper on linen+gingham, wordmark, one tender line, one shork-on-the-latch with a daisy. No ACCESS DENIED. No flower explosion.

Implementation notes:
- Prefer a small server-checked cookie (httpOnly) set by a Server Action or Route Handler. Compare against SITE_PASSWORD with a timing-safe compare. Do not put the password in client bundles as a “secret.”
- Middleware may redirect ungated reader requests to a /enter (or similar) page. Keep /admin excluded.
- robots.ts already disallow-all; every reader page metadata robots: noindex, nofollow. No sitemap. No Open Graph that includes letter bodies. Default OG/title must not leak unpublished text.

Acceptance:
- With SITE_PASSWORD set, / is blocked until the passphrase succeeds, then home works as before.
- /admin is not behind SITE_PASSWORD (it will get Auth in the next prompt).
- Wrong password does not reveal whether a letter slug exists.
- Phone and desktop on the gate screen.

Do not build admin auth in this prompt.
```

---

## Prompt 5 — Admin auth + letter CRUD

```
Read planning.md and ui-ux.md. Reader + passphrase already work. Implement only Prompt 5: Achilles’ admin.

Routes:
- /admin/login
- /admin — letters list
- /admin/letters/new
- /admin/letters/[id] — edit

Auth:
- Supabase Auth email+password (or magic link if simpler; password is fine).
- @supabase/ssr cookie session. Middleware: unauthenticated /admin/* (except login) → /admin/login. Authenticated login page → /admin.
- ADMIN_EMAIL allowlist: even if someone has a Supabase user, Server Actions must reject if email !== ADMIN_EMAIL.
- Disable any in-app public sign-up. Do not add a register page.

CRUD via Server Actions (not a swarm of /api files):
- List all letters (drafts included): label, slug, published, sort_order. Search by label. Link to edit.
- Create: label, slug (editable), body markdown textarea, published toggle, sort_order, optional written_at.
- Update: same fields. Changing slug is allowed but warn that the public URL changes.
- Delete: confirm dialog. Copy should mention preferring unpublish for the original 15.
- Publish rule: refuse published=true if body is empty/whitespace. Show a clear error.
- After save: revalidatePath for /, /letters/[slug], and admin paths.

Admin UI (ui-ux.md “utilitarian picnic”):
- Same picnic tokens, Nunito, sage buttons, strawberry only for delete confirm.
- shadcn form/input/textarea/dialog/button. No floral doodles on the table. No sharks in the letters table. Favicon + optional login wordmark only.
- Nav: Letters · New · Log out
- Markdown preview on create/edit must use reader LetterSheet styles (Lora on paper) so I see what she sees.
- Must work on a phone.

Acceptance:
- I can log in as the allowlisted user, create a letter, publish it, see it on the reader home, edit it, unpublish it (it disappears for Vivienne), delete with confirm.
- Anon still cannot insert/update via RLS.
- npm run build succeeds.
- Do not add reorder-by-drag unless it is easy; sort_order number field is enough.
- Do not add image uploads.

Verify admin list + editor on phone and desktop widths.
```

---

## Prompt 6 — Polish: stickers, empty states, motion, quality bar

```
Read planning.md and ui-ux.md, especially Quality bar, Anti-patterns, Sharks, Texture, and Components.

The app is functionally complete. Implement only Prompt 6: visual polish and consistency. Do not add features (no PWA, no analytics, no related letters, no dark mode).

Do this:

1. Finish ShorkMark poses used in the spec: face, daisy, peek, nap, search, seal. Same character, same stroke. Recolor via currentColor where possible.

2. PicnicShell edge doodles: flowers + 1–2 sharks, pointer-events none, not covering tap targets. Gingham at 6–10% opacity; lower behind the letter column.

3. Card stickers: six-item cycle mixing daisy, clover, envelope, shork-with-daisy, round shork face, pressed leaf.

4. Letter floral corners + peeking shork + end seal on every letter.

5. Passphrase, empty home, and not-found match ui-ux illustrations and copy.

6. Motion 150–250ms fade/rise; card hover 120–180ms lift + blush; reduced-motion = fade only. No typewriter, confetti, envelope 3D, shark cursor, chomping spinner.

7. Contrast: warm ink on cream passes WCAG AA. Full prompt text visible, never truncated.

8. Run the ui-ux.md quality-bar checklist on passphrase, home, letter, empty, not-found, admin list, admin editor.

Acceptance:
- A glance at home shows cream, sage, a flower, paper, and a shark.
- Admin is still faster than cute.
- Phone and desktop re-verified for reader and admin.
- No new libraries.

Fix any leftover default shadcn zinc on the reader. Do not restyle admin into a flower garden.
```

---

## Prompt 7 — Deploy on Vercel Hobby (when you are ready)

```
Read planning.md. The app builds locally. Help me deploy to Vercel Hobby (free). Do not upgrade plans or add paid add-ons.

Do this:

1. Confirm npm run build succeeds. Fix any production-only issues (env, SSR, middleware).

2. Give me a short checklist I must do in the dashboards:
   - GitHub/GitLab repo (only if I ask you to commit/push — ask before git commit or git push)
   - Vercel project: framework Next.js, build npm run build
   - Env on Vercel: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SITE_PASSWORD, ADMIN_EMAIL
   - Supabase Auth URL config: add the Vercel domain to allowed redirect URLs
   - Confirm RLS still on; public sign-ups still disabled

3. If I ask you to commit: follow my git commit rules, do not commit .env.local or letter bodies.

4. After deploy: remind me to publish letters in /admin (seed rows are unpublished) and to open the site on my phone.

Do not add a custom domain unless I provide one. Do not enable Vercel Analytics unless I ask. Do not put secrets in the chat log if avoidable — refer to env var names.
```

---

## Prompt A — Manual Supabase steps (you, not the agent)

Do this in the browser while Prompt 2’s SQL exists. Not an agent prompt.

1. Create a free Supabase project.
2. SQL editor: run `schema.sql`, then RLS, then `seed.sql`.
3. Authentication → disable sign-ups.
4. Authentication → add one user (your email). That email must match `ADMIN_EMAIL`.
5. Project Settings → API: copy Project URL and anon public key into `.env.local`.
6. Do **not** put the service role key in `.env.local` unless a later prompt truly needs it server-only.
7. Table Editor: leave all 15 unpublished until you write bodies in `/admin`.

---

## Prompt B — One-shot (only if you want a single chat)

Heavier and easier to miss details. Prefer 1→7. Use this only in a fresh repo with a capable agent.

```
Read planning.md, ui-ux.md, and prompts.md.

Build Vivienne Shork end-to-end for Vercel Hobby.

Stack: Next.js App Router, TypeScript, Tailwind, shadcn/ui (admin only), lucide (admin/back chevron), Supabase Postgres + Auth + SSR cookies, Server Actions for CRUD, react-markdown. npm. No Framer Motion, no PWA, no dark mode, no extra CMS.

Product: private letters for Vivienne. Home is greeting + title cards; tap opens that one letter; back to home. 15 seed labels unpublished (catalog in planning.md). Achilles CRUD at /admin. Passphrase gate on reader only (SITE_PASSWORD). Noindex. One letters table, RLS as specified.

Visuals: follow ui-ux.md strictly (picnic stationery, gingham, flowers, round shorks, tokens, fonts, components, copy voice, quality bar). Desktop home is 2 columns. Admin is quiet picnic, not decorated.

Deliver: working local app, SQL files, .env.example, supabase README for my dashboard steps. Do not create cloud projects, do not commit secrets, do not invent letter bodies.

Verify reader and admin on phone and desktop widths before you finish. Then give me the Vercel env checklist.
```

---

## Prompt C — Review / bugfix (after a build)

```
Read planning.md and ui-ux.md. Review the current implementation against both files.

Check:
- Settled stack only; no extra libraries that were not allowed
- RLS and publish rules; drafts never leak
- Passphrase does not wrap /admin; Auth wraps /admin
- Reader is two screens; full labels; no CMS language
- Picnic quality bar and anti-patterns (no ocean theme, no mood-colored cards, no script body type)
- Admin CRUD actually publishes/unpublishes without redeploy
- Env vars named as in planning.md; no secrets in git

List findings as: must-fix / nice-to-have. Then fix must-fix items if I don’t say review-only.
```

---

## Suggested chat sequence

| Order | Prompt | What you should see when it is done |
|---|---|---|
| 0 | Picnic skill | `.cursor/skills/vivienne-picnic-ui/SKILL.md` |
| 1 | Scaffold + theme | Local home already looks like a picnic |
| — | **You:** Prompt A | Supabase project + `.env.local` |
| 2 | SQL + clients | Schema/seed in repo; app still builds |
| 3 | Reader | Empty state, then live cards after you publish one test row |
| 4 | Passphrase | `/` locked until `SITE_PASSWORD` |
| 5 | Admin CRUD | You write and publish the 15 letters |
| 6 | Polish | Flowers + shorks consistent, quality bar |
| 7 | Deploy | Live on `*.vercel.app` |

---

## Standing lines (add under any prompt)

Paste if the agent drifts:

```
Do not reopen the stack. Do not add a feelings taxonomy, PWA, native app, Framer Motion, dark mode, or letter images. Do not put letter bodies in git. planning.md wins on behavior/data/stack; ui-ux.md wins on look. Ask before git commit, git push, or creating Vercel/Supabase projects.
```
