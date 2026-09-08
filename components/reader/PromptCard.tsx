import Link from "next/link";
import { CardSticker } from "@/components/reader/CardStickers";

type PromptCardProps = {
  label: string;
  href: string;
  stickerIndex: number;
  pinned?: boolean;
};

export function PromptCard({
  label,
  href,
  stickerIndex,
  pinned = false,
}: PromptCardProps) {
  return (
    <Link
      href={href}
      className="picnic-card picnic-shadow relative flex min-h-11 items-center gap-2.5 rounded-3xl border border-wicker bg-paper px-5 py-5 pr-12 text-[1.1rem] font-semibold leading-[1.35] text-pretty text-ink no-underline"
    >
      {pinned ? <PinStar /> : null}
      <CardSticker index={stickerIndex} />
      <span className="whitespace-normal">{label}</span>
    </Link>
  );
}

function PinStar() {
  return (
    <span className="inline-flex size-5 shrink-0" title="Pinned">
      <svg viewBox="0 0 20 20" className="size-full" aria-hidden>
        <path
          d="M10 2.2 12.1 7.1 17.4 7.6 13.4 11.2 14.6 16.4 10 13.6 5.4 16.4 6.6 11.2 2.6 7.6 7.9 7.1Z"
          fill="var(--picnic-daisy)"
          stroke="var(--picnic-sage)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
      <span className="sr-only">Pinned. </span>
    </span>
  );
}
