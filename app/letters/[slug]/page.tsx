import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/reader/BackLink";
import { LetterSheet } from "@/components/reader/LetterSheet";
import { hasValidGateCookie, requireReaderAccess } from "@/lib/gate-session";
import { getPublishedLetterBySlug } from "@/lib/letters";
import { privatePageMetadata } from "@/lib/privacy";

export const dynamic = "force-dynamic";

type LetterPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: LetterPageProps): Promise<Metadata> {
  if (!(await hasValidGateCookie())) {
    return privatePageMetadata;
  }

  const { slug } = await params;
  const letter = await getPublishedLetterBySlug(slug);

  if (!letter) {
    return privatePageMetadata;
  }

  return {
    ...privatePageMetadata,
    title: `${letter.label} · From Akhi Tortol`,
  };
}

export default async function LetterPage({ params }: LetterPageProps) {
  await requireReaderAccess();
  const { slug } = await params;
  const letter = await getPublishedLetterBySlug(slug);

  if (!letter) {
    notFound();
  }

  return (
    <main className="picnic-enter picnic-letter-page mx-auto w-full max-w-[44rem]">
      <BackLink />
      <div className="mt-5 md:mt-6">
        <LetterSheet
          label={letter.label}
          body={letter.body}
          writtenAt={letter.written_at}
        />
      </div>
    </main>
  );
}
