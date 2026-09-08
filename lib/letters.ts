import { connection } from "next/server";
import {
  compareAdminLetters,
  comparePublishedLetters,
  countPinned,
  cohort,
  kindOf,
  MAX_PINS,
} from "@/lib/letter-order";
import {
  desiredSortOrders,
  shiftForDelete,
  shiftForInsert,
  type OrderedId,
} from "@/lib/sort-order";
import {
  createClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import type { LetterRow } from "@/lib/supabase/types";

export type Letter = LetterRow;

export function isMissingLettersTable(error: { message: string } | null): boolean {
  if (!error) {
    return false;
  }
  const message = error.message.toLowerCase();
  return (
    message.includes("schema cache") ||
    message.includes("could not find the table")
  );
}

export function isMissingPinnedColumn(error: { message: string } | null): boolean {
  if (!error) {
    return false;
  }
  const message = error.message.toLowerCase();
  return (
    message.includes("pinned") &&
    (message.includes("column") ||
      message.includes("schema cache") ||
      message.includes("could not find"))
  );
}

function assertNoError<T>(
  data: T | null,
  error: { message: string } | null,
): T {
  if (error) {
    throw new Error(error.message);
  }
  return data as T;
}

export async function probeLettersTable(): Promise<
  { ready: true } | { ready: false; error: string }
> {
  await connection();
  if (!isSupabaseConfigured()) {
    return {
      ready: false,
      error:
        "Supabase isn’t configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("letters").select("id, pinned").limit(1);

  if (!error) {
    return { ready: true };
  }

  if (isMissingLettersTable(error)) {
    return {
      ready: false,
      error:
        "The letters table isn’t in this Supabase project yet. In the SQL editor, run supabase/setup.sql, then reload.",
    };
  }

  if (isMissingPinnedColumn(error)) {
    return {
      ready: false,
      error:
        "The letters table needs a pinned column. Run the SQL shown below, then reload.",
    };
  }

  return { ready: false, error: error.message };
}

export async function listPublishedLetters(): Promise<Letter[]> {
  await connection();
  if (!isSupabaseConfigured()) {
    return [];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("letters")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("label", { ascending: true });

  if (isMissingLettersTable(error) || isMissingPinnedColumn(error)) {
    return [];
  }

  return (assertNoError(data, error) ?? []).slice().sort(comparePublishedLetters);
}

export async function getPublishedLetterBySlug(
  slug: string,
): Promise<Letter | null> {
  await connection();
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("letters")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (isMissingLettersTable(error)) {
    return null;
  }

  return assertNoError(data, error);
}

export async function listAllLetters(query?: string): Promise<Letter[]> {
  await connection();
  if (!isSupabaseConfigured()) {
    return [];
  }

  const supabase = await createClient();
  const trimmed = query?.trim();
  let request = supabase
    .from("letters")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("label", { ascending: true });

  if (trimmed) {
    const escaped = trimmed.replace(/[%_\\]/g, "\\$&");
    request = request.ilike("label", `%${escaped}%`);
  }

  const { data, error } = await request;
  return (assertNoError(data, error) ?? []).slice().sort(compareAdminLetters);
}

export async function getLetterById(id: string): Promise<Letter | null> {
  await connection();
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("letters")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  return assertNoError(data, error);
}

export async function getNextSortOrder(): Promise<number> {
  return 1;
}

export async function getPinnedCount(exceptId?: string): Promise<number> {
  const letters = await listAllLetters();
  return countPinned(letters, exceptId);
}

export type LetterWrite = {
  label: string;
  slug: string;
  body: string;
  published: boolean;
  pinned: boolean;
  sort_order: number;
  written_at: string | null;
};

function asOrdered(letters: Letter[]): OrderedId[] {
  return letters.map((letter) => ({
    id: letter.id,
    sort_order: letter.sort_order,
  }));
}

async function applySortOrders(
  current: OrderedId[],
  next: OrderedId[],
): Promise<void> {
  const previous = new Map(current.map((item) => [item.id, item.sort_order]));
  const supabase = await createClient();

  for (const item of next) {
    if (previous.get(item.id) === item.sort_order) {
      continue;
    }
    const { error } = await supabase
      .from("letters")
      .update({ sort_order: item.sort_order })
      .eq("id", item.id);
    assertNoError(true, error);
  }
}

function assertPinAvailable(letters: Letter[], pinned: boolean, exceptId?: string) {
  if (!pinned) {
    return;
  }
  if (countPinned(letters, exceptId) >= MAX_PINS) {
    throw new Error("Two letters are already pinned.");
  }
}

function insertTarget(
  kind: ReturnType<typeof kindOf>,
  sortOrder: number,
  flushDraftToTop: boolean,
): number {
  return kind === "draft" && flushDraftToTop ? 1 : sortOrder;
}

export async function createLetter(input: LetterWrite): Promise<Letter> {
  const existing = await listAllLetters();
  assertPinAvailable(existing, input.pinned);

  const kind = kindOf(input);
  const peers = asOrdered(cohort(existing, kind));
  const { next, sort_order } = shiftForInsert(
    peers,
    insertTarget(kind, input.sort_order, kind === "draft"),
  );

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("letters")
    .insert({ ...input, sort_order })
    .select("*")
    .single();

  const created = assertNoError(data, error);
  await applySortOrders(asOrdered(existing), next);
  return created;
}

export async function updateLetter(
  id: string,
  input: LetterWrite,
): Promise<Letter> {
  const existing = await listAllLetters();
  const current = existing.find((letter) => letter.id === id);
  assertPinAvailable(existing, input.pinned, id);

  const others = existing.filter((letter) => letter.id !== id);
  const newKind = kindOf(input);
  let sort_order = Math.max(1, input.sort_order);
  const nextUpdates: OrderedId[] = [];

  if (current && kindOf(current) === newKind) {
    if (current.sort_order !== sort_order || current.sort_order < 1) {
      const peers = [...asOrdered(cohort(others, newKind)), { id, sort_order: current.sort_order }];
      const next = desiredSortOrders(peers, id, sort_order);
      sort_order = next.find((item) => item.id === id)?.sort_order ?? sort_order;
      nextUpdates.push(...next);
    }
  } else {
    if (current) {
      nextUpdates.push(
        ...shiftForDelete(asOrdered(cohort(others, kindOf(current)))),
      );
    }
    const inserted = shiftForInsert(
      asOrdered(cohort(others, newKind)),
      insertTarget(newKind, input.sort_order, newKind === "draft"),
    );
    sort_order = inserted.sort_order;
    nextUpdates.push(...inserted.next);
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("letters")
    .update({ ...input, sort_order })
    .eq("id", id)
    .select("*")
    .single();

  const updated = assertNoError(data, error);
  if (nextUpdates.length > 0) {
    await applySortOrders(asOrdered(existing), nextUpdates);
  }
  return updated;
}

export async function deleteLetter(id: string): Promise<void> {
  const existing = await listAllLetters();
  const current = existing.find((letter) => letter.id === id);
  const supabase = await createClient();
  const { error } = await supabase.from("letters").delete().eq("id", id);
  assertNoError(true, error);
  if (!current) {
    return;
  }
  const remaining = existing.filter((letter) => letter.id !== id);
  await applySortOrders(
    asOrdered(existing),
    shiftForDelete(asOrdered(cohort(remaining, kindOf(current)))),
  );
}
