export const MAX_PINS = 2;

export type LetterKind = "pinned" | "draft" | "published";

export type OrderableLetter = {
  id: string;
  label: string;
  published: boolean;
  pinned: boolean;
  sort_order: number;
};

export function kindOf(letter: {
  published: boolean;
  pinned: boolean;
}): LetterKind {
  if (letter.pinned) {
    return "pinned";
  }
  if (!letter.published) {
    return "draft";
  }
  return "published";
}

export function cohort<T extends { published: boolean; pinned: boolean }>(
  letters: T[],
  kind: LetterKind,
): T[] {
  return letters.filter((letter) => kindOf(letter) === kind);
}

export function compareAdminLetters(
  a: OrderableLetter,
  b: OrderableLetter,
): number {
  if (a.pinned !== b.pinned) {
    return a.pinned ? -1 : 1;
  }
  if (a.published !== b.published) {
    return a.published ? 1 : -1;
  }
  if (a.sort_order !== b.sort_order) {
    return a.sort_order - b.sort_order;
  }
  return a.label.localeCompare(b.label);
}

export function comparePublishedLetters(
  a: OrderableLetter,
  b: OrderableLetter,
): number {
  if (a.pinned !== b.pinned) {
    return a.pinned ? -1 : 1;
  }
  if (a.sort_order !== b.sort_order) {
    return a.sort_order - b.sort_order;
  }
  return a.label.localeCompare(b.label);
}

export function countPinned(
  letters: { id: string; pinned: boolean }[],
  exceptId?: string,
): number {
  return letters.filter(
    (letter) => letter.pinned && letter.id !== exceptId,
  ).length;
}
