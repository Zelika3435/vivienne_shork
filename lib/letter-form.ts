import { z } from "zod";

export const letterFormSchema = z.object({
  label: z.string().trim().min(1, "Add a label."),
  slug: z
    .string()
    .trim()
    .min(1, "Add a slug.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers, and hyphens.",
    ),
  body: z.string(),
  published: z.boolean(),
  pinned: z.boolean(),
  sort_order: z
    .number()
    .int("Sort order must be a whole number.")
    .min(1, "Sort order starts at 1."),
  written_at: z.string().optional(),
});

export type LetterFormValues = z.infer<typeof letterFormSchema>;

export function slugifyLabel(label: string): string {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function emptyToNull(value: string | null | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  return trimmed.length > 0 ? trimmed : null;
}

export function publishBlockedByEmptyBody(
  published: boolean,
  body: string,
): boolean {
  return published && body.trim().length === 0;
}
