import { connection } from "next/server";
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
  const { error } = await supabase.from("letters").select("id").limit(1);

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

  if (isMissingLettersTable(error)) {
    return [];
  }

  return assertNoError(data, error) ?? [];
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
  return assertNoError(data, error) ?? [];
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
  const letters = await listAllLetters();
  const max = letters.reduce((highest, letter) => {
    return Math.max(highest, letter.sort_order);
  }, 0);
  return max + 1;
}

export type LetterWrite = {
  label: string;
  slug: string;
  body: string;
  published: boolean;
  sort_order: number;
  written_at: string | null;
};

export async function createLetter(input: LetterWrite): Promise<Letter> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("letters")
    .insert(input)
    .select("*")
    .single();

  return assertNoError(data, error);
}

export async function updateLetter(
  id: string,
  input: LetterWrite,
): Promise<Letter> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("letters")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();

  return assertNoError(data, error);
}

export async function deleteLetter(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("letters").delete().eq("id", id);
  assertNoError(true, error);
}
