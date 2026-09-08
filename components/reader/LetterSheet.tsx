import { FlowerDoodle, ShorkMark } from "@/components/reader/ShorkMark";
import { LetterMarkdown } from "@/lib/markdown";

type LetterSheetProps = {
  label: string;
  body: string;
  writtenAt?: string | null;
};

export function LetterSheet({ label, body, writtenAt }: LetterSheetProps) {
  const hasBody = body.trim().length > 0;
  const dateLabel = writtenAt ? formatWrittenAt(writtenAt) : null;

  return (
    <article className="picnic-shadow relative overflow-hidden rounded-[1.75rem] border border-wicker bg-paper px-6 py-10 md:px-12 md:py-14">
      <FloralCorners />

      <div className="relative mx-auto max-w-[70ch]">
        <h1 className="pr-14 font-display text-[1.75rem] font-semibold leading-[1.2] text-ink md:pr-16 md:text-[2.25rem]">
          {label}
        </h1>
        {dateLabel ? (
          <p className="mt-3 font-accent text-[1.35rem] leading-none text-ink-soft">
            {dateLabel}
          </p>
        ) : null}

        {hasBody ? (
          <div className="letter-prose mt-8">
            <LetterMarkdown source={body} />
          </div>
        ) : null}

        <div className="mt-10 flex justify-center md:mt-12">
          <ShorkMark pose="seal" className="size-16 md:size-[4.5rem]" />
        </div>
      </div>
    </article>
  );
}

function formatWrittenAt(value: string) {
  const iso = value.includes("T") ? value : `${value}T00:00:00`;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function FloralCorners() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <FlowerDoodle
        kind="daisy"
        className="absolute -left-3 -top-3 size-[4.5rem] rotate-[-8deg] opacity-80"
      />
      <div className="absolute -right-1 -top-1 size-24">
        <ShorkMark
          pose="peek"
          className="absolute right-0 top-3 size-[4.25rem] opacity-95 md:size-[4.75rem]"
          title=""
        />
        <FlowerDoodle
          kind="blush"
          className="absolute -right-2 -top-2 size-16 rotate-[14deg] opacity-90"
        />
        <FlowerDoodle
          kind="leaf"
          className="absolute bottom-1 right-8 size-10 rotate-[28deg] opacity-80"
        />
      </div>
      <FlowerDoodle
        kind="leaf"
        className="absolute -bottom-3 -left-2 size-16 rotate-[16deg] opacity-75"
      />
      <FlowerDoodle
        kind="daisy"
        className="absolute -bottom-2 -right-2 size-[4.25rem] rotate-[28deg] opacity-70"
      />
    </div>
  );
}
