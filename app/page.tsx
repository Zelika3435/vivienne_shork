import type { Metadata } from "next";
import { PromptCard } from "@/components/reader/PromptCard";
import { SoftEmpty } from "@/components/reader/SoftEmpty";
import { Wordmark } from "@/components/reader/Wordmark";
import { requireReaderAccess } from "@/lib/gate-session";
import { listPublishedLetters } from "@/lib/letters";
import { privateRobots } from "@/lib/privacy";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: privateRobots,
};

export default async function HomePage() {
  await requireReaderAccess();
  const letters = await listPublishedLetters();

  return (
    <main className="picnic-enter mx-auto max-w-[42rem] md:max-w-[1080px]">
      <header className="mb-8 md:mb-10">
        <Wordmark />
        <div className="mt-8 text-center">
          <h1 className="font-display text-[1.85rem] font-semibold leading-tight text-ink md:text-[2.15rem]">
            Hi, Vivienne!
          </h1>
          <p className="mt-2 font-accent text-[1.35rem] leading-snug text-ink-soft">
            Pick what you need.
          </p>
        </div>
        {letters.length > 0 ? (
          <p className="mt-6 font-accent text-[1.35rem] leading-none text-ink-soft md:mt-8">
            Read this when…
          </p>
        ) : null}
      </header>

      {letters.length === 0 ? (
        <SoftEmpty />
      ) : (
        <ul className="grid list-none grid-cols-1 gap-3.5 p-0 md:grid-cols-2 md:gap-4">
          {letters.map((letter) => (
            <li key={letter.id}>
              <PromptCard
                label={letter.label}
                href={`/letters/${letter.slug}`}
                stickerIndex={letter.sort_order % 6}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
