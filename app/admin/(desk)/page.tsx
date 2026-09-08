import type { Metadata } from "next";
import Link from "next/link";
import { Star } from "lucide-react";
import { SetupNotice } from "@/components/admin/SetupNotice";
import { listAllLetters, probeLettersTable } from "@/lib/letters";
import { privatePageMetadata } from "@/lib/privacy";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  ...privatePageMetadata,
  title: "Letters · From Akhi Tortol",
};

type AdminPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function AdminLettersPage({ searchParams }: AdminPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const table = await probeLettersTable();
  let letters: Awaited<ReturnType<typeof listAllLetters>> = [];
  let loadError: string | null = table.ready ? null : table.error;
  if (table.ready) {
    try {
      letters = await listAllLetters(query);
    } catch (error) {
      loadError = error instanceof Error ? error.message : "Couldn’t load letters.";
    }
  }

  return (
    <main className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="font-sans text-2xl font-semibold text-ink">Letters</h1>
        <p className="font-sans text-sm text-ink-soft">
          Drafts stay here until you publish them.
        </p>
      </div>

      <form className="flex flex-col gap-2 sm:flex-row" action="/admin">
        <label className="sr-only" htmlFor="letter-search">
          Search by label
        </label>
        <Input
          id="letter-search"
          name="q"
          defaultValue={query}
          placeholder="Search by label"
          className="min-h-11 rounded-2xl border-wicker bg-kraft px-4 text-base text-ink"
        />
        <Button
          type="submit"
          variant="outline"
          className="min-h-11 rounded-full border-wicker bg-paper px-4 text-ink"
        >
          Search
        </Button>
      </form>

      {loadError ? (
        <SetupNotice error={loadError} />
      ) : letters.length === 0 ? (
        <p className="rounded-2xl border border-wicker bg-paper px-4 py-6 font-sans text-sm text-ink-soft">
          {query
            ? "No labels match that search."
            : "No letters yet. Start with New."}
        </p>
      ) : (
        <ul className="flex list-none flex-col gap-2 p-0">
          {letters.map((letter) => (
            <li key={letter.id}>
              <Link
                href={`/admin/letters/${letter.id}`}
                className="flex min-h-14 flex-col gap-1 rounded-2xl border border-wicker bg-paper px-4 py-3 no-underline transition-colors hover:bg-cream md:flex-row md:items-center md:justify-between md:gap-4"
              >
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 font-sans text-base font-semibold text-ink">
                    {letter.pinned ? (
                      <Star
                        className="size-4 shrink-0 fill-daisy text-sage"
                        aria-label="Pinned"
                      />
                    ) : null}
                    {letter.label}
                  </p>
                  <p className="font-sans text-sm text-ink-soft">
                    /{letter.slug} · {letter.sort_order}
                  </p>
                </div>
                <StatusPill published={letter.published} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

function StatusPill({ published }: { published: boolean }) {
  if (published) {
    return (
      <span className="inline-flex w-fit shrink-0 rounded-full bg-sage px-2.5 py-1 font-sans text-xs font-semibold text-cream">
        Published
      </span>
    );
  }

  return (
    <span className="inline-flex w-fit shrink-0 rounded-full bg-kraft px-2.5 py-1 font-sans text-xs font-semibold text-ink-soft">
      Draft
    </span>
  );
}
