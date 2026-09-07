import { CardSticker } from "@/components/reader/CardStickers";

type PromptCardProps = {
  label: string;
  href?: string;
  stickerIndex: number;
};

export function PromptCard({
  label,
  href = "#",
  stickerIndex,
}: PromptCardProps) {
  return (
    <a
      href={href}
      className="picnic-card picnic-shadow relative flex min-h-11 items-center rounded-3xl border border-wicker bg-paper px-5 py-5 pr-12 text-[1.1rem] font-semibold leading-[1.35] text-ink transition-[transform,background-color] duration-150 ease-out hover:-translate-y-0.5 hover:bg-blush/35 focus-visible:bg-blush/35"
    >
      <CardSticker index={stickerIndex} />
      <span>{label}</span>
    </a>
  );
}
