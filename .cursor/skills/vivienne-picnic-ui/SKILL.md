---
name: vivienne-picnic-ui
description: >-
  Enforces Vivienne Shork reader and admin UI: picnic stationery aesthetic,
  gingham, pressed flowers, cream paper letters, and cute round sharks (shorks)
  she loves, cutesy but readable typography (Fraunces, Lora, Nunito, Caveat),
  sage/strawberry/blush/pebble tokens, no mood-colored cards and no ocean theme.
  Use when building or changing UI, Tailwind theme, reader components, letter
  page, passphrase gate, empty states, or when the user mentions picnic,
  flowers, sharks, shork, letters aesthetic, cutesy, gingham, or visual design.
---

# Vivienne picnic UI

Whenever you design, implement, restyle, or review UI in this repo, follow this skill.

## First

1. Read `planning.md` at the repo root for product, data, and stack.
2. Read `ui-ux.md` at the repo root for visual truth.

Conflict: behavior / data / stack → `planning.md`. Look and feel → `ui-ux.md`. Home desktop layout and home header → `ui-ux.md` (2-column card grid on `md:+`; quiet wordmark + shork on home; greeting on the same page as cards; no bottom nav).

Do not duplicate those files here. Hex values, type scale, sticker cycle, and component details live in `ui-ux.md`.

## Product surface

The reader is a picnic blanket of folded letters for Vivienne — not a blog, not a dashboard.

- Home = greeting + full-sentence prompt cards. Tap a card → that one letter → back.
- No filters, tags, search, related letters, splash, or bottom nav.
- Admin shares picnic tokens but stays undecorated. No floral doodles on the table. No sharks in the letters table (favicon / optional login wordmark only).

Stack (do not reopen): Next.js App Router, TypeScript, Tailwind, shadcn for admin forms, custom chrome for the reader, lucide for admin and a back chevron. No Framer Motion, no extra icon packs, no paid fonts, no dark mode.

## Tokens and type

Use only Picnic stationery tokens from `ui-ux.md`: linen, paper, cream, kraft, wicker, sage, sage-deep, leaf, strawberry, blush, daisy, sky, pebble, ink, ink-soft, white.

- Page: linen. Cards and letter sheet: paper. Borders: wicker. Ink is warm brown.
- No pure black, no cool gray, no navy ocean palette, no default shadcn zinc on the reader.
- Primary actions: sage. Destructive: soft strawberry. Focus: sage + a hint of daisy.
- Sky and pebble are doodle fills only — never a full-page ocean.

Fonts via `next/font` (Google) only — four families, no fifth:

| Role | Family |
|---|---|
| Wordmark + letter titles | Fraunces |
| Letter body | Lora |
| UI / cards / admin | Nunito |
| Tiny handwriting accents | Caveat |

Never set letter bodies in Caveat or Fraunces. Do not uppercase prompt sentences. Do not truncate card labels.

## Decoration

SVG / CSS only. No photographs, no illustration libraries.

- Light gingham overlay on linen (strawberry or sage at 6–10% opacity). Drop opacity further behind the letter column.
- Edge doodles: flowers + 1–2 shorks, `pointer-events: none`, never covering tap targets.
- Card stickers: cycle 6 by `sort_order % 6`, mixing flowers and sharks. Decoration, not a feelings taxonomy. Do not map tired→blue. Do not use the same shork on every card.
- Letter sheet: floral corners; one peeking shork; shork wax-seal on every letter.
- Wordmark + favicon: round shork (daisy in fin / flower crown on the wordmark; face on cream for favicon).
- Passphrase: one shork-on-the-latch with a daisy.
- Empty: shork waiting with a daisy. Not-found: shork searching.

One `ShorkMark` character: round body, blush cheeks, pebble/sky fill, picnic props. Crescent smile or closed happy eyes. No teeth, no realistic jaws, no chomping spinner, no shark cursor, no looping ocean.

## Layout and motion

- Phone: one column. Desktop home: 2 columns (`md:+`); 3 only if cards stay large. Centered; lots of blanket around the grid.
- Tap targets ≥ 44px. Whole card is the hit area. No hover-only actions.
- Letter: cream paper sheet, 60–70ch, Lora line-height 1.7–1.8. Back link (“Back to the picnic”) at top and after the body.
- Motion: 150–250ms fade + tiny rise. Card hover 120–180ms. Honor `prefers-reduced-motion` (fade only). No typewriter, confetti, or unskippable envelope animation.

## Copy and privacy

Chrome sounds like a note on the basket. Reader: Open / Come in, Back to the picnic, That letter isn’t here, Nothing to read just yet, That passphrase isn’t right.

Do not use CMS, content, posts, collection, moods, or journal on the reader. Do not leak that a draft exists. Passphrase gate feels like unlatching a basket/envelope — tender, not ACCESS DENIED.

## Components

Custom reader chrome, not a shadcn dashboard skin: PicnicShell, Wordmark, PromptCard, LetterSheet, BackLink, GateCard, SoftEmpty, SoftNotFound, ShorkMark.

Theme shadcn admin with picnic CSS variables. Do not skin the reader like default zinc.

Keep images rare. Do not add image-heavy assets.

## Do

- Treat home as notes on a blanket; the letter page as one stationery sheet.
- Mix flower and shork stickers; keep every shark the same character.
- Verify phone and desktop for every surface you touch. Prefer browser verification when tools exist.

## Don't

- Mood-colored cards, ocean/navy palettes, realistic sharks, teeth-forward poses
- Script or Fraunces for letter body; Inter / Roboto / zinc on the reader
- Pure black, cool gray, glassmorphism, neon, dark mode
- Bottom nav, extra reader pages, hover-only controls
- Framer Motion, new icon packs, photograph backgrounds, paid fonts
- Decorate admin like the reader

## Done checklist

Run this before calling UI work done:

- [ ] Reads as a picnic of letters at a glance (cream, sage, a flower, paper, **and a shark**)
- [ ] Full prompt text visible on every card; 44px+ thumb targets; no pinching to read
- [ ] Letter measure 60–70ch, line-height 1.7–1.8, warm ink on cream passes WCAG AA
- [ ] Motion skippable / `prefers-reduced-motion` safe
- [ ] Admin is faster than cute
- [ ] No draft leakage, no CMS language, no extra pages, no ocean theme
