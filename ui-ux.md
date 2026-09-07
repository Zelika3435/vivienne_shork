# Vivienne Shork — UI/UX Reference

Use this file as the visual and interaction source of truth. Product rules still live in `planning.md`. If the two conflict on **behavior, data, or stack**, follow `planning.md`. If they conflict on **look and feel**, follow this file.

Do not start coding until the user asks to build.

---

## North star

Vivienne opens a **picnic blanket of letters**, not a blog and not a dashboard.

She is choosing a moment (“Read this when you are tired”), then reading **that one letter** as if someone left it for her on a cream sheet of paper, with a pressed flower in the corner and a tiny shark keeping her company. The whole reader should feel **cutesy, tender, and handmade** — picnic gingham, wildflowers, envelopes, and gentle shorks — without becoming a toy, a wedding site, or a kawaii sticker bomb.

**One sentence:** a private picnic of flowers, folded letters, and little sharks, written only for her.

### Mood words (use these)

Picnic · pressed flowers · cream paper · gingham · lemonade light · handwritten stamp · unhurried · cutesy · intimate · round shork · daisy-in-fin · blush cheeks

### Mood words (avoid)

SaaS · dashboard · dark mode first · neon · gothic romance · luxury black-gold · brutalist · corporate pastel-generic · chaotic maximalist kawaii

### What this is not

- Not a public magazine. No hero marketing, no SEO chrome, no share-to-social cards with letter text.
- Not a feelings app. Cards are prompts, not mood tags or color-coded emotions.
- Not a 3D envelope gimmick. A hint of stationery is enough. Opening a letter should be instant, not a 4-second animation she cannot skip.

---

## Research notes (why these choices)

Picnic palettes work because they borrow from things people already know: strawberry gingham, lawn sage, cream paper, lemonade yellow. They stay friendly without extra explanation. Cottagecore systems (sage + cream + warm serif, generous rounding, organic shadow) are the closest web-design cousin — but pure cottagecore can go earthy and quiet. This product should stay **cuter and more stationery-like**: more picnic blanket, more petals, more “a letter for you.”

Practical takeaways used here:

- Ground brights in **cream / kraft / warm ink** so strawberries and daisies do not scream.
- **No pure black, no cool gray.** Ink is brown. Surfaces are paper. Borders are wicker.
- Wildflower brights belong on **illustrations**, not on every button.
- Long letters need a **real reading serif**. Handwriting is an accent, never the body.
- Gingham and florals are **texture at low opacity**, not wallpaper that fights the text.
- Envelope / paper metaphors help the passphrase gate and the letter page. Home is a **stack of notes on a blanket**, not a mail client.
- Sharks belong in the **same doodle language as the flowers** (line-art, round, picnic props). They are a beloved motif, not a second theme. No ocean backgrounds, navy palettes, or Jaws energy.

References that informed the tokens (do not copy their components wholesale):

- Picnic palette families such as gingham strawberry, basket-weave neutrals, garden tea party
- Cottagecore UI tokens: sage `#7A9E6D`, cream `#FAF5EE`, warm ink `#3D3A34`
- Type pairings used in journaling / stationery web: **Fraunces** display, **Lora** reading, **Nunito** UI, **Caveat** handwriting accent

---

## Two surfaces, one picnic

| Surface | Who | Aesthetic intensity |
|---|---|---|
| **Reader** | Vivienne | Full picnic: gingham wash, floral doodles, paper letter, cutesy type, a few sharks |
| **Admin** | Achilles | Same tokens, much quieter. Cream + sage + shadcn. No scattered flowers. Still warm, never “CMS gray” |

They share color and type so `/admin` does not feel like a different product. Decoration is reader-only.

---

## Color

Name the palette **Picnic stationery**. Implement as CSS variables (and Tailwind theme keys that match). Do not invent extra brand colors later without asking.

### Core tokens

| Token | Hex | Role |
|---|---|---|
| `--picnic-linen` | `#FAF5EE` | Page background (linen picnic cloth) |
| `--picnic-paper` | `#FFF8F1` | Letter sheet, elevated cards |
| `--picnic-cream` | `#F3E6D4` | Alternate surface, gingham light square |
| `--picnic-kraft` | `#E4D0B4` | Envelope, input fill, warm rule |
| `--picnic-wicker` | `#C9B7A3` | Borders |
| `--picnic-sage` | `#7A9E6D` | Primary actions, grass, success |
| `--picnic-sage-deep` | `#5C7A52` | Primary hover / pressed |
| `--picnic-leaf` | `#8FBC8A` | Soft floral fill, icon tint |
| `--picnic-strawberry` | `#E07A7A` | Gingham dark, small hearts, destructive-but-soft |
| `--picnic-blush` | `#F4C7C2` | Petal wash, selected/hover card |
| `--picnic-daisy` | `#F0D78C` | Tiny highlight (stamp, focus ring mix) — never large fills |
| `--picnic-sky` | `#B7D0DC` | Hydrangea, shallow-water tint on shork doodles (never a full ocean fill) |
| `--picnic-pebble` | `#C4B5A8` | Warm shark-body fill (taupe, not cool gray) |
| `--picnic-ink` | `#3D332C` | Body text (warm brown, not black) |
| `--picnic-ink-soft` | `#7A7468` | Captions, timestamps, placeholders |
| `--picnic-white` | `#FFFBFA` | Inner letter highlight |

### How to use them

- **Page:** `linen`. Optional ultra-subtle gingham overlay (see Texture).
- **Prompt cards:** `paper` on `linen`, border `wicker`, hover wash `blush` at ~35% or a 1px strawberry edge.
- **Primary button (reader):** sage fill, cream text. Rounded like a pebble (`rounded-full` or `rounded-2xl`).
- **Secondary button:** paper fill, wicker border, ink text.
- **Letter body:** ink on paper. Links inside letters: sage, underlined.
- **Focus ring:** sage + a hint of daisy. Never default browser blue.
- **Errors:** strawberry, but still soft (no alarm red `#ff0000`).
- **Admin published badge:** sage pill. Draft: kraft pill with ink-soft text.
- **Shork doodles:** pebble body, blush cheeks, sky tint optional, ink-soft outline. Never fill a whole page with sky.

### Contrast (required)

Warm brown on cream must still pass **WCAG AA** (4.5:1 body, 3:1 large type). If a decorative wash hurts contrast, darken ink or lighten the wash — do not “make it cuter” by lowering contrast. Gingham and florals sit **behind** content, never on top of text.

---

## Typography

Load via `next/font` (Google). Four families, strict jobs. Do not add a fifth.

| Role | Family | Weight | Use |
|---|---|---|---|
| **Wordmark + letter title** | **Fraunces** | 500–700, `SOFT` ~50–80, optical size display | “Vivienne Shork”, prompt titles on the letter page |
| **Letter body** | **Lora** | 400 / 500 italic | Markdown article. Comfortable, a little literary |
| **UI** | **Nunito** | 500 / 600 / 700 | Home cards, buttons, admin, passphrase form |
| **Handwriting accent** | **Caveat** | 500 / 600 | Tiny only: “for Vivienne”, optional `written_at`, stamp, empty-state aside |

### Scale (reader)

- Wordmark: ~1.15–1.4rem Nunito or small Fraunces — quiet, not a billboard
- Home quiet line (“Read this when…” if used): Caveat ~1.35rem or Fraunces italic
- Prompt cards: Nunito 1.05–1.2rem, weight 600, line-height 1.35. Full sentence visible. Do not truncate.
- Letter title: Fraunces ~1.75rem phone / ~2.25rem desktop, line-height ~1.2
- Letter body: Lora 1.125–1.25rem, line-height **1.7–1.8**, measure **60–70ch** on desktop
- Captions: Nunito 0.8–0.875rem, ink-soft

### Type rules

- Letter body is **never** Caveat or Fraunces. Reading comfort beats cute.
- Do not uppercase the prompts. They are spoken sentences.
- Ligatures on Fraunces/Lora are welcome. Do not letter-space body text.
- Admin can use Nunito everywhere; Lora is not required in forms.

---

## Texture, flowers, letters

Decoration is **SVG / CSS**, not photographs. `planning.md` keeps images rare and letter bodies text-only in v1. That still allows a small set of inline SVGs in `public/` or as React components.

### Picnic blanket (page)

A very light gingham on `linen`:

- Two `repeating-linear-gradient` lines (strawberry or sage at **6–10% opacity**)
- Cell size ~18–24px
- Hide or drop opacity further behind the letter column so it never competes with reading

Optional: a few **scattered doodles** at the page edges — mix flowers with **one or two sharks** (napping on the blanket, daisy in its fin, peeking from the gingham). They must not cover tap targets. `pointer-events: none`.

### Stationery cards (home)

Each published prompt is a **folded note** sitting on the blanket:

- Cream paper fill, 16–24px padding, `rounded-2xl` or `rounded-3xl` (soft, not squircle-app)
- 1px wicker border + a **softer organic shadow** (warm, blurry, low contrast — not Material elevation)
- A small **sticker** in one corner (rotate −8° to 12°)
- Cycle **6 stickers** by `sort_order % 6` so the grid feels picked, not identical. Mix flowers **and** sharks, for example: daisy · clover · envelope · shork-with-daisy · tiny round shork face · pressed leaf. This is decoration, **not** a mood taxonomy. Do not map tired→blue, sad→gray, etc. Do not put the **same** shark on every card.
- Optional tiny envelope-flap or stamp mark (“open”) in Caveat, ink-soft — not a badge count

Full label on the card: `Read this when you are tired`.

### Letter page (the actual letter)

Treat the article as a **sheet of paper**:

- Centered paper panel, extra padding, slightly deeper cream than the blanket
- Delicate **floral corners** (line-art, 1–1.5px stroke, sage/blush/sky). Same motif on all letters so it feels like one stationery set. **One corner may hide a tiny shork** peeking through the flowers (same on every letter — a signature, not a randomizer)
- **Wax-seal stamp** after the title or at the end of the body: a round sage + blush **shork seal** (cheeks, closed or crescent smile, optional daisy). Not a 3D render, not a realistic jaw
- If `written_at` exists: Caveat caption, ink-soft, like a date on a note
- Markdown: generous paragraph spacing; blockquotes as a sage left rule + italic Lora; no GitHub-flavored “code blog” look

### Sharks (she loves them)

Sharks are a **first-class cute motif**, equal to flowers — still picnic, never aquarium.

Draw **shorks**: round body, short fin, blush cheeks, pebble/sky fill, ink-soft outline in the same 1–1.5px line-art as the florals. Props from the picnic (daisy crown, sandwich, envelope, gingham bow). Crescent smile or closed happy eyes. No rows of teeth, no blood, no realistic great white, no side-view hunter pose.

**Where they show up (required — at least these):**

| Place | What to draw |
|---|---|
| **Favicon / apple-touch** | Round shork face on cream. This is the mark of the site. |
| **Wordmark** | “Vivienne Shork” plus a tiny shork (daisy in fin or flower crown), sitting beside the name — always visible on home |
| **Home stickers** | At least two of the six cycling card stickers are sharks |
| **Letter seal** | Shork wax-seal at the end of every letter |
| **Letter corner** | One floral corner includes a peeking shork |
| **Passphrase** | Shork sitting on the basket / envelope latch (one illustration, not a crowd) |
| **Empty home** | Shork waiting on the blanket with a daisy |
| **Not-found** | Shork looking for a letter that drifted off |

**Where they stay small:**

- Admin: favicon + maybe the login wordmark. No sharks in the letters table.
- Do not add a chomping spinner, a swimming shark cursor, or a looping ocean animation.
- Do not recolor the product navy/charcoal “because sharks.” Sky and pebble are doodle fills only.

A visitor should notice **flowers and a shark within a few seconds** on home, and meet the seal-shork again when she finishes a letter.

### Passphrase gate

Feels like unlatching a picnic basket / unsealing an envelope:

- Centered kraft-or-paper card on linen+gingham
- Wordmark + one tender line (not “Unauthorized”)
- Single password field, sage submit
- No flower explosion. One shork-on-the-latch (with a daisy) is enough
- Errors stay gentle and specific: “That passphrase isn’t right” — not “ACCESS DENIED”

---

## Layout and interaction

Follow `planning.md` breakpoints and tap sizes. This section only art-directs them.

### Phone (reader)

- One column of prompt cards, stacked with ~12–16px gaps
- Comfortable side padding; honor `env(safe-area-inset-*)` and `100dvh`
- Tap targets ≥ 44px. Whole card is the hit area
- Tiny top bar: wordmark with shork (home) or back + short “back to picnic” (letter). **No bottom nav**
- Letter: paper panel nearly full width, still with margin so it still reads as a sheet

### Desktop (`md:`+)

- Home: **2 columns**, 3 only if cards stay large and calm. Lots of blanket showing around the grid. Max width ~960–1100px, centered
- Letter: paper column 60–70ch, floral corners, blanket visible in the margins
- Hover is extra: card lifts 2–4px, blush wash, flower sticker may rotate 2°. **Never hover-only**

### Motion

Cutesy does not mean bouncy-everything.

- Page enter: 150–250ms fade + tiny rise (`8–12px`). Ease out.
- Card hover/press: 120–180ms
- Back navigation: no dramatic envelope-close
- Respect `prefers-reduced-motion: reduce` — fade only, no rotation, no gingham that animates
- **No typewriter** reveal of letter bodies. She is tired or sad; do not make her wait for characters
- **No confetti** on open. Save delight for the stationery, not particle effects

---

## Screen-by-screen

### 1. Passphrase

Quiet latch. After success, land on home. Do not persist a “welcome modal.”

### 2. Home — the picker

- Optional quiet line above the grid: “Read this when…” in Caveat or Fraunces italic, then cards still show the **full sentence** (default from `planning.md`)
- Order: `sort_order` ascending
- Empty published set: shork waiting on the blanket with a daisy + “Nothing to read just yet. Come back soon.” Not an error, not a spinner forever

### 3. Letter `/letters/[slug]`

- Back control first in the header (text + chevron, not a mystery icon-only control)
- Title = the same prompt
- Body = markdown in Lora on paper
- End of letter: shork wax-seal, then the same back link again so she does not hunt

### 4. Unknown / unpublished slug

Soft not-found on the blanket: “That letter isn’t here.” Do not hint that a draft exists. Offer a link home. A shork searching the grass (maybe with an empty envelope) is the illustration.

### 5. Admin (utilitarian picnic)

- Login, list, new, edit as in `planning.md`
- Cream page, sage primary buttons, strawberry only for delete confirm
- shadcn forms are correct here. Do not floral-doodle the table
- Nav: Letters · New · Log out — Nunito, readable
- Preview of markdown should use **reader letter styles** (Lora on paper) so Achilles sees what she sees

---

## Copy voice (UI chrome only)

Letter bodies are Achilles’ words. UI chrome should sound like a note on the basket, not a product.

| Instead of | Write |
|---|---|
| Submit / Continue | Open, Come in |
| Home | Back to the picnic (letter page). Wordmark is enough on home |
| 404 | That letter isn’t here |
| Empty | Nothing to read just yet |
| Login error | That passphrase isn’t right |
| Publish | Publish (admin can stay plain) |
| Delete | Delete this letter (confirm). Prefer unpublish copy when relevant |

Do not use “CMS”, “content”, “posts”, “collection”, “moods”, or “journal entries” on the reader.

---

## Components (reader)

Keep the set small. Custom chrome, not a shadcn dashboard skin.

1. **PicnicShell** — linen + gingham + safe area + edge doodles (flowers + 1–2 shorks)
2. **Wordmark** — name + tiny shork with daisy
3. **PromptCard** — full label, cycling flower/shark sticker, whole-card link
4. **LetterSheet** — paper panel, floral corners with peeking shork, title, markdown body, shork seal
5. **BackLink** — always visible, always works without hover
6. **GateCard** — passphrase with shork-on-the-latch
7. **SoftEmpty / SoftNotFound** — shork waiting / shork searching
8. **ShorkMark** — shared SVG (face, with-daisy, peeking, seal) so every shark is the same character

Icons: `lucide-react` is fine for admin and for a simple chevron. On the reader, prefer the floral + shork SVGs for personality; do not mix 12 different lucide icons on home. Do not use lucide’s generic `Fish` as the mascot.

Admin: stock shadcn button, input, textarea, dialog, table/list — themed with picnic CSS variables.

---

## Implementation notes (when building)

- Tailwind theme: map the tokens above. Reader layout should not look like default shadcn zinc.
- Floral **and** shork art: one consistent stroke language (rounded caps, 1.5px, slightly imperfect is ok). Recolor via `currentColor` so they tint sage/blush/strawberry/sky/pebble.
- Keep one `ShorkMark` character in a few poses (face, daisy, peek, nap, search, seal). Do not invent a new shark style per screen.
- Do not add a new illustration library, icon pack, or animation library unless asked. CSS + SVG is enough. Framer Motion is **not** in the stack.
- Dark mode: **out of scope**. Picnic is daylight. Do not auto-invert to navy “for the ocean.”
- Favicon / apple-touch: round shork face on cream. Not the Next.js default.

---

## Quality bar

A screen is done when:

- [ ] It still reads as a picnic of letters at a glance (cream, sage, a flower, paper, **and a shark**)
- [ ] Vivienne can tap a prompt with a thumb and read without pinching or squinting
- [ ] Full prompt text is visible on every card
- [ ] Letter measure and contrast are comfortable for a long read
- [ ] Motion is skippable / reduced-motion safe
- [ ] Admin is faster than cute
- [ ] No draft leakage, no CMS language, no extra pages

---

## Anti-patterns

- Rainbow cards that encode moods
- Heavy photograph backgrounds (real picnic photos, stock flowers)
- Script font for the letter body
- Inter / Roboto / default shadcn zinc on the reader
- Pure black text, cool gray borders, glassmorphism, neon gradients
- Auto-playing envelope 3D, typewriter, confetti, sparkle cursors
- Bottom tab bars, search, filters, “related letters”
- Putting the **same** shork sticker on every card (cycle; mix with flowers)
- Realistic sharks, teeth-forward poses, chomping loaders, ocean/navy palettes
- Making admin as decorated as the reader

---

## Prompt for a UI/UX skill

Copy everything in the block below into a later chat when you want a Cursor project skill that forces this aesthetic on implementation and UI work.

```
Create a Cursor project skill at .cursor/skills/vivienne-picnic-ui/SKILL.md for Vivienne Shork.

Purpose: whenever the agent designs, implements, restyles, or reviews UI for this repo, it must follow the picnic / flowers / letters / sharks / cutesy aesthetic in ui-ux.md and the product rules in planning.md.

Target location: project skill (.cursor/skills/), shared with the repo. Do not put it in ~/.cursor/skills-cursor/.

disable-model-invocation: omit it (allow auto-invoke). The skill should load when the agent works on reader/admin UI, Tailwind/theme tokens, layout, components, empty states, the passphrase gate, letter typography, or when the user mentions picnic, flowers, sharks, shork, cutesy, stationery, gingham, or visual design.

Read ui-ux.md and planning.md first, then write a concise SKILL.md (well under 500 lines). Do not duplicate the whole spec. Put essential must-follow rules in SKILL.md and point to ../../ui-ux.md and ../../planning.md for the rest (one level of extra files from the skill is enough; if relative paths from the skill folder are awkward, tell the agent to read ui-ux.md and planning.md at the repo root).

Skill name: vivienne-picnic-ui

Description (third person, WHAT + WHEN, include trigger terms): Enforces Vivienne Shork reader and admin UI: picnic stationery aesthetic, gingham, pressed flowers, cream paper letters, and cute round sharks (shorks) she loves, cutesy but readable typography (Fraunces, Lora, Nunito, Caveat), sage/strawberry/blush/pebble tokens, no mood-colored cards and no ocean theme. Use when building or changing UI, Tailwind theme, reader components, letter page, passphrase gate, empty states, or when the user mentions picnic, flowers, sharks, shork, letters aesthetic, cutesy, gingham, or visual design.

SKILL.md must instruct the agent to:

1. Read planning.md for product/stack (Next.js App Router, Tailwind, shadcn for admin, custom chrome for reader, lucide, no extra animation library unless asked).
2. Read ui-ux.md for visual truth. If behavior/data/stack conflict, planning.md wins. If look-and-feel conflict, ui-ux.md wins.
3. Treat the reader as a picnic blanket of folded letters for Vivienne, not a blog or dashboard. Admin shares tokens but stays undecorated.
4. Use only the Picnic stationery tokens from ui-ux.md (linen, paper, cream, kraft, wicker, sage, strawberry, blush, daisy, sky, pebble, warm ink). No pure black, no cool gray, no dark mode, no navy ocean palette.
5. Fonts via next/font only: Fraunces (wordmark/letter titles), Lora (letter body), Nunito (UI/cards), Caveat (tiny handwriting accents). Never set letter bodies in script or Fraunces.
6. Decoration is SVG/CSS only: light gingham overlay; cycling card stickers that mix flowers and sharks (not a feelings taxonomy); floral letter corners with one peeking shork; shork wax-seal on every letter; wordmark + favicon shork; shork on the passphrase latch; shork empty/not-found illustrations. One ShorkMark character (round, blush, daisy props). No teeth-forward sharks, no chomping spinners, not the same sticker on every card.
7. Home = list of full-sentence prompt cards; tap opens that letter. No filters, tags, related letters, bottom nav, or hover-only actions. 44px+ targets. 2-column desktop grid max unless 3 still feels calm.
8. Letter page is a cream paper sheet, 60–70ch, line-height 1.7–1.8, back link at top and bottom. No typewriter, confetti, or unskippable envelope animation. Honor prefers-reduced-motion.
9. Passphrase gate feels like unlatching a basket/envelope; copy stays tender. Soft empty and not-found states. Do not leak drafts.
10. shadcn is for admin forms; theme it with picnic CSS variables. Do not skin the reader like default zinc shadcn.
11. Do not add image-heavy assets, new icon packs, Framer Motion, or paid fonts. Keep images rare.
12. After UI changes, verify phone and desktop for the surfaces touched. Prefer browser verification when tools exist.

Include a short do/don't list and a checklist the agent must run before calling UI work done (readable picnic at a glance with a flower and a shark; full prompt on cards; letter contrast; reduced motion; admin still fast; no CMS language; no ocean theme).

Do not start implementing the app. Only create the skill files. Keep SKILL.md in English, imperative, concise. No fluff about what a design system is.
```
