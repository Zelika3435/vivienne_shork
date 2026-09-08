/** Original letter slugs. Prefer unpublish over delete for these. */
export const ORIGINAL_LETTER_SLUGS = [
  "tired",
  "miss-me",
  "want-to-quit",
  "stressed",
  "feel-alone",
  "cannot-sleep",
  "proud",
  "hungry",
  "sad",
  "need-to-smile",
  "overwhelmed",
  "finish-working",
  "doubt-yourself",
  "wake-up-early",
  "need-a-break",
] as const;

export function isOriginalCatalogSlug(slug: string): boolean {
  return (ORIGINAL_LETTER_SLUGS as readonly string[]).includes(slug);
}
