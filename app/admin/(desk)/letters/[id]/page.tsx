import type { Metadata } from "next";
import { AdminBackLink } from "@/components/admin/AdminBackLink";
import { LetterForm } from "@/components/admin/LetterForm";
import { getLetterById } from "@/lib/letters";
import { privatePageMetadata } from "@/lib/privacy";

export const dynamic = "force-dynamic";

type EditLetterPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: EditLetterPageProps): Promise<Metadata> {
  const { id } = await params;
  const letter = await getLetterById(id);

  return {
    ...privatePageMetadata,
    title: letter
      ? `${letter.label} · Desk`
      : "Letter · Vivienne Shork",
  };
}

export default async function EditLetterPage({ params }: EditLetterPageProps) {
  const { id } = await params;
  const letter = await getLetterById(id);

  if (!letter) {
    return (
      <main className="flex flex-col gap-4">
        <AdminBackLink />
        <h1 className="font-sans text-2xl font-semibold text-ink">
          That letter isn’t here
        </h1>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-5">
      <AdminBackLink />
      <div className="flex flex-col gap-1">
        <h1 className="font-sans text-2xl font-semibold text-ink">Edit letter</h1>
        <p className="font-sans text-sm text-ink-soft">{letter.label}</p>
      </div>
      <LetterForm
        mode="edit"
        id={letter.id}
        slug={letter.slug}
        defaults={{
          label: letter.label,
          slug: letter.slug,
          body: letter.body,
          published: letter.published,
          sort_order: letter.sort_order,
          written_at: letter.written_at ?? "",
        }}
      />
    </main>
  );
}
