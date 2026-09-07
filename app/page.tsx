import { PromptCard } from "@/components/reader/PromptCard";
import { Wordmark } from "@/components/reader/Wordmark";

const PLACEHOLDER_CARDS = [
  { label: "Read this when you are tired", stickerIndex: 0 },
  { label: "Read this when you miss me", stickerIndex: 3 },
  { label: "Read this when you need a break", stickerIndex: 1 },
] as const;

export default function HomePage() {
  return (
    <main className="picnic-enter mx-auto max-w-[42rem] md:max-w-[1080px]">
      <header className="mb-8 md:mb-10">
        <Wordmark />
        <h1 className="mt-8 font-display text-[1.85rem] font-semibold leading-tight text-ink md:text-[2.15rem]">
          Hi, Vivienne.
        </h1>
        <p className="mt-2 font-accent text-[1.35rem] leading-snug text-ink-soft">
          Pick what you need.
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-4">
        {PLACEHOLDER_CARDS.map((card) => (
          <li key={card.label}>
            <PromptCard
              label={card.label}
              href="#"
              stickerIndex={card.stickerIndex}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
