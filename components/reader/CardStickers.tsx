import type { CSSProperties } from "react";
import { ShorkMark } from "@/components/reader/ShorkMark";

const STICKER_ROTATIONS = [-8, 10, -4, 12, 6, -6] as const;

type CardStickerProps = {
  index: number;
  className?: string;
};

export function CardSticker({ index, className }: CardStickerProps) {
  const kind = ((index % 6) + 6) % 6;
  const rotate = STICKER_ROTATIONS[kind];

  return (
    <span
      className={`picnic-sticker pointer-events-none absolute -right-1 -top-2 size-11 ${className ?? ""}`}
      style={{ "--sticker-rot": `${rotate}deg` } as CSSProperties}
      aria-hidden
    >
      {kind === 0 ? <DaisySticker /> : null}
      {kind === 1 ? <CloverSticker /> : null}
      {kind === 2 ? <EnvelopeSticker /> : null}
      {kind === 3 ? (
        <ShorkMark pose="daisy" className="size-full" title="" />
      ) : null}
      {kind === 4 ? (
        <ShorkMark pose="face" className="size-full" title="" />
      ) : null}
      {kind === 5 ? <LeafSticker /> : null}
    </span>
  );
}

function DaisySticker() {
  return (
    <svg viewBox="0 0 40 40" className="size-full" fill="none">
      <g
        fill="var(--picnic-paper)"
        stroke="var(--picnic-sage)"
        strokeWidth="1.3"
        strokeLinejoin="round"
      >
        <ellipse cx="20" cy="10" rx="4" ry="7" />
        <ellipse cx="20" cy="30" rx="4" ry="7" />
        <ellipse cx="10" cy="20" rx="7" ry="4" />
        <ellipse cx="30" cy="20" rx="7" ry="4" />
        <ellipse
          cx="12.5"
          cy="12.5"
          rx="4.5"
          ry="6"
          transform="rotate(-45 12.5 12.5)"
        />
        <ellipse
          cx="27.5"
          cy="12.5"
          rx="4.5"
          ry="6"
          transform="rotate(45 27.5 12.5)"
        />
      </g>
      <circle
        cx="20"
        cy="20"
        r="4.5"
        fill="var(--picnic-daisy)"
        stroke="var(--picnic-ink-soft)"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function CloverSticker() {
  return (
    <svg viewBox="0 0 40 40" className="size-full" fill="none">
      <path
        d="M20 18c-6-8-14-4-10 4-6 2-6 10 2 10h16c8 0 8-8 2-10 4-8-4-12-10-4Z"
        fill="var(--picnic-leaf)"
        stroke="var(--picnic-sage-deep)"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M20 28c1 5 4 8 7 9"
        stroke="var(--picnic-sage-deep)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EnvelopeSticker() {
  return (
    <svg viewBox="0 0 40 40" className="size-full" fill="none">
      <rect
        x="6"
        y="12"
        width="28"
        height="18"
        rx="3"
        fill="var(--picnic-paper)"
        stroke="var(--picnic-wicker)"
        strokeWidth="1.4"
      />
      <path
        d="M7 14.5 20 24 33 14.5"
        stroke="var(--picnic-sage)"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="29" cy="13" r="4" fill="var(--picnic-strawberry)" />
    </svg>
  );
}

function LeafSticker() {
  return (
    <svg viewBox="0 0 40 40" className="size-full" fill="none">
      <path
        d="M10 28c2-12 10-20 22-22-2 12-10 20-22 22Z"
        fill="var(--picnic-leaf)"
        stroke="var(--picnic-sage-deep)"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M13 26c6-6 12-10 18-14"
        stroke="var(--picnic-sage-deep)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
