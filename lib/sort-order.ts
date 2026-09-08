export type OrderedId = {
  id: string;
  sort_order: number;
};

function byCurrentOrder(a: OrderedId, b: OrderedId): number {
  if (a.sort_order !== b.sort_order) {
    return a.sort_order - b.sort_order;
  }
  return a.id.localeCompare(b.id);
}

function clampPosition(target: number, max: number): number {
  if (!Number.isFinite(target) || max < 1) {
    return 1;
  }
  return Math.min(Math.max(1, Math.trunc(target)), max);
}

function numberSequentially(items: OrderedId[]): OrderedId[] {
  return items.map((item, index) => ({
    id: item.id,
    sort_order: index + 1,
  }));
}

/** Place a letter at `targetOrder` and keep everyone else 1, 2, 3… */
export function desiredSortOrders(
  items: OrderedId[],
  movingId: string,
  targetOrder: number,
): OrderedId[] {
  const sorted = [...items].sort(byCurrentOrder);
  const from = sorted.findIndex((item) => item.id === movingId);
  if (from === -1) {
    return numberSequentially(sorted);
  }

  const [moved] = sorted.splice(from, 1);
  const to = clampPosition(targetOrder, sorted.length + 1) - 1;
  sorted.splice(to, 0, moved);
  return numberSequentially(sorted);
}

/** Make room for a new letter at `targetOrder`. */
export function shiftForInsert(
  items: OrderedId[],
  targetOrder: number,
): { next: OrderedId[]; sort_order: number } {
  const sorted = [...items].sort(byCurrentOrder);
  const to = clampPosition(targetOrder, sorted.length + 1) - 1;
  const next = sorted.map((item, index) => ({
    id: item.id,
    sort_order: index >= to ? index + 2 : index + 1,
  }));
  return { next, sort_order: to + 1 };
}

/** Close the gap after a letter is removed. */
export function shiftForDelete(items: OrderedId[]): OrderedId[] {
  return numberSequentially([...items].sort(byCurrentOrder));
}
