import Link from "next/link";
import { CardSticker } from "@/components/reader/CardStickers";

type PromptCardProps = {
  label: string;
  href: string;
  stickerIndex: number;
};

export function PromptCard({ label, href, stickerIndex }: PromptCardProps) {
  return (
    <Link
      href={href}
      className="picnic-card picnic-shadow relative flex min-h-11 items-center rounded-3xl border border-wicker bg-paper px-5 py-5 pr-12 text-[1.1rem] font-semibold leading-[1.35] text-pretty text-ink no-underline"
    >
      <CardSticker index={stickerIndex} />
      <span className="whitespace-normal">{label}</span>
    </Link>
  );
}
