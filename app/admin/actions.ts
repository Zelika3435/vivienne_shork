"use server";

import { revalidatePath } from "next/cache";
import { rejectIfNotAdmin } from "@/lib/auth";
import {
  emptyToNull,
  letterFormSchema,
  publishBlockedByEmptyBody,
} from "@/lib/letter-form";
import {
  createLetter,
  deleteLetter,
  getLetterById,
  updateLetter,
} from "@/lib/letters";

export type LetterActionState = {
  error: string | null;
  success?: boolean;
  id?: string;
};

function formatWriteError(error: unknown): string {
  const message = error instanceof Error ? error.message : "Could not save that letter.";
  const lower = message.toLowerCase();
  if (lower.includes("letters_slug") || (lower.includes("slug") && lower.includes("unique"))) {
    return "That slug is already used.";
  }
  if (lower.includes("letters_label") || (lower.includes("label") && lower.includes("unique"))) {
    return "That label is already used.";
  }
  return message;
}

function revalidateLetterSurfaces(input: {
  id?: string;
  slug: string;
  previousSlug?: string | null;
}) {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/letters/new");
  revalidatePath(`/letters/${input.slug}`);
  if (input.previousSlug && input.previousSlug !== input.slug) {
    revalidatePath(`/letters/${input.previousSlug}`);
  }
  if (input.id) {
    revalidatePath(`/admin/letters/${input.id}`);
  }
}

export async function createLetterAction(
  _prev: LetterActionState,
  formData: FormData,
): Promise<LetterActionState> {
  const gate = await rejectIfNotAdmin();
  if (!gate.ok) {
    return { error: gate.error };
  }

  const parsed = letterFormSchema.safeParse({
    label: formData.get("label"),
    slug: formData.get("slug"),
    body: formData.get("body") ?? "",
    published: formData.get("published") === "on",
    pinned: formData.get("pinned") === "on",
    sort_order: Number(formData.get("sort_order")),
    written_at: String(formData.get("written_at") ?? ""),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  }

  const values = parsed.data;
  if (publishBlockedByEmptyBody(values.published, values.body)) {
    return { error: "Write the letter before publishing." };
  }

  let letter;
  try {
    letter = await createLetter({
      label: values.label,
      slug: values.slug,
      body: values.body,
      published: values.published,
      pinned: values.pinned,
      sort_order: values.sort_order,
      written_at: emptyToNull(values.written_at),
    });
  } catch (error) {
    return { error: formatWriteError(error) };
  }

  revalidateLetterSurfaces({ id: letter.id, slug: letter.slug });
  return { error: null, success: true, id: letter.id };
}

export async function updateLetterAction(
  id: string,
  _prev: LetterActionState,
  formData: FormData,
): Promise<LetterActionState> {
  const gate = await rejectIfNotAdmin();
  if (!gate.ok) {
    return { error: gate.error };
  }

  const existing = await getLetterById(id);
  if (!existing) {
    return { error: "That letter isn’t here." };
  }

  const parsed = letterFormSchema.safeParse({
    label: formData.get("label"),
    slug: formData.get("slug"),
    body: formData.get("body") ?? "",
    published: formData.get("published") === "on",
    pinned: formData.get("pinned") === "on",
    sort_order: Number(formData.get("sort_order")),
    written_at: String(formData.get("written_at") ?? ""),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  }

  const values = parsed.data;
  if (publishBlockedByEmptyBody(values.published, values.body)) {
    return { error: "Write the letter before publishing." };
  }

  try {
    const letter = await updateLetter(id, {
      label: values.label,
      slug: values.slug,
      body: values.body,
      published: values.published,
      pinned: values.pinned,
      sort_order: values.sort_order,
      written_at: emptyToNull(values.written_at),
    });
    revalidateLetterSurfaces({
      id: letter.id,
      slug: letter.slug,
      previousSlug: existing.slug,
    });
    return { error: null, success: true };
  } catch (error) {
    return { error: formatWriteError(error) };
  }
}

export async function deleteLetterAction(id: string): Promise<LetterActionState> {
  const gate = await rejectIfNotAdmin();
  if (!gate.ok) {
    return { error: gate.error };
  }

  const existing = await getLetterById(id);
  if (!existing) {
    return { error: "That letter isn’t here." };
  }

  try {
    await deleteLetter(id);
  } catch (error) {
    return { error: formatWriteError(error) };
  }

  revalidateLetterSurfaces({ slug: existing.slug, previousSlug: existing.slug });
  return { error: null, success: true };
}
