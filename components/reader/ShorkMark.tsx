import { cn } from "@/lib/utils";

export type ShorkPose = "face" | "daisy" | "peek" | "nap" | "search" | "seal";

type ShorkMarkProps = {
  pose?: ShorkPose;
  className?: string;
  title?: string;
};

const POSE_LABELS: Record<ShorkPose, string> = {
  face: "Shork",
  daisy: "Shork with a daisy",
  peek: "Shork peeking through flowers",
  nap: "Shork napping on the blanket",
  search: "Shork looking for a letter",
  seal: "Shork wax seal",
};

const STROKE = "var(--picnic-ink-soft)";
const INK = "var(--picnic-ink)";
const BLUSH = "var(--picnic-blush)";
const SKY = "var(--picnic-sky)";
const DAISY = "var(--picnic-daisy)";
const PAPER = "var(--picnic-paper)";
const SAGE = "var(--picnic-sage)";
const SAGE_DEEP = "var(--picnic-sage-deep)";
const LEAF = "var(--picnic-leaf)";
const WICKER = "var(--picnic-wicker)";

export function ShorkMark({
  pose = "face",
  className,
  title,
}: ShorkMarkProps) {
  const label = title ?? POSE_LABELS[pose];

  return (
    <svg
      viewBox="0 0 80 80"
      className={cn("text-pebble", className)}
      role={title === "" ? undefined : "img"}
      aria-hidden={title === "" ? true : undefined}
      aria-label={title === "" ? undefined : label}
      fill="none"
    >
      {title === "" ? null : <title>{label}</title>}
      {pose === "face" ? <FaceShork /> : null}
      {pose === "daisy" ? <DaisyShork /> : null}
      {pose === "peek" ? <PeekingShork /> : null}
      {pose === "nap" ? <NappingShork /> : null}
      {pose === "search" ? <SearchingShork /> : null}
      {pose === "seal" ? <SealShork /> : null}
    </svg>
  );
}

function FaceShork() {
  return (
    <>
      <ellipse cx="40" cy="46" rx="23" ry="20" fill="currentColor" />
      <path d="M40 26c0-8 6-16 8-18 1.2 4 2 10-1 18" fill="currentColor" />
      <ellipse
        cx="40"
        cy="46"
        rx="23"
        ry="20"
        stroke={STROKE}
        strokeWidth="1.5"
      />
      <path
        d="M40 26c0-8 6-16 8-18 1.2 4 2 10-1 18"
        stroke={STROKE}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ShorkFace cx={40} cy={46} />
    </>
  );
}

function DaisyShork() {
  return (
    <>
      <ellipse cx="40" cy="46" rx="24" ry="20" fill="currentColor" />
      <path d="M40 26c0-8 6-16 8-18 1.2 4 2 10-1 18" fill="currentColor" />
      <path d="M58 40c8 1 14 6 16 10-6 1-12-1-16-6" fill={SKY} />
      <path d="M22 48c-7 4-10 10-10 14 6-1 12-5 14-10" fill="currentColor" />
      <ellipse
        cx="40"
        cy="46"
        rx="24"
        ry="20"
        stroke={STROKE}
        strokeWidth="1.5"
      />
      <path
        d="M40 26c0-8 6-16 8-18 1.2 4 2 10-1 18"
        stroke={STROKE}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M58 40c8 1 14 6 16 10-6 1-12-1-16-6"
        stroke={STROKE}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 48c-7 4-10 10-10 14 6-1 12-5 14-10"
        stroke={STROKE}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ShorkFace cx={40} cy={46} />
      <DaisyBloom cx={54} cy={11} scale={0.92} />
    </>
  );
}

function PeekingShork() {
  return (
    <g transform="translate(10 16)">
      <ellipse cx="36" cy="50" rx="22" ry="20" fill="currentColor" />
      <path d="M36 30c0-7 5-14 7-16 1 4 2 9-1 16" fill="currentColor" />
      <ellipse
        cx="36"
        cy="50"
        rx="22"
        ry="20"
        stroke={STROKE}
        strokeWidth="1.5"
      />
      <path
        d="M36 30c0-7 5-14 7-16 1 4 2 9-1 16"
        stroke={STROKE}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ShorkFace cx={36} cy={46} scale={0.92} />
    </g>
  );
}

function NappingShork() {
  return (
    <>
      <g transform="rotate(-20 40 48)">
        <ellipse cx="42" cy="50" rx="26" ry="15" fill="currentColor" />
        <path d="M22 44c-6-8-3-16 1-20 1.6 6 3.4 12 1 20" fill="currentColor" />
        <path d="M64 46c8 1 13 7 15 12-6 0-11-2-15-8" fill={SKY} />
        <ellipse
          cx="42"
          cy="50"
          rx="26"
          ry="15"
          stroke={STROKE}
          strokeWidth="1.5"
        />
        <path
          d="M22 44c-6-8-3-16 1-20 1.6 6 3.4 12 1 20"
          stroke={STROKE}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M64 46c8 1 13 7 15 12-6 0-11-2-15-8"
          stroke={STROKE}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <ShorkFace cx={44} cy={50} scale={0.88} sleepy />
      </g>
      <DaisyBloom cx={16} cy={22} scale={0.62} />
    </>
  );
}

function SearchingShork() {
  return (
    <>
      <g transform="translate(-2 2)">
        <ellipse cx="36" cy="44" rx="22" ry="18" fill="currentColor" />
        <path d="M36 26c0-7 5.5-14 7.5-16 1 4 2 9-1 16" fill="currentColor" />
        <path d="M54 38c7 1 13 6 15 10-6 1-11-1-15-6" fill={SKY} />
        <ellipse
          cx="36"
          cy="44"
          rx="22"
          ry="18"
          stroke={STROKE}
          strokeWidth="1.5"
        />
        <path
          d="M36 26c0-7 5.5-14 7.5-16 1 4 2 9-1 16"
          stroke={STROKE}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M54 38c7 1 13 6 15 10-6 1-11-1-15-6"
          stroke={STROKE}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <ShorkFace cx={36} cy={44} scale={0.92} looking="right" />
      </g>
      <g transform="translate(48 48)">
        <rect
          x="0"
          y="4"
          width="22"
          height="14"
          rx="2"
          fill={PAPER}
          stroke={WICKER}
          strokeWidth="1.3"
        />
        <path
          d="M1 5.5 11 12 21 5.5"
          stroke={SAGE}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </>
  );
}

function SealShork() {
  return (
    <>
      <circle cx="40" cy="40" r="36" fill={SAGE} />
      <circle cx="40" cy="40" r="30" fill={LEAF} />
      <circle cx="40" cy="40" r="26" fill={BLUSH} />
      <ellipse cx="40" cy="42" rx="18" ry="15" fill="currentColor" />
      <path d="M40 27c0-5 4-10 5.5-12 .8 3 1.4 7-.8 12" fill="currentColor" />
      <ellipse
        cx="40"
        cy="42"
        rx="18"
        ry="15"
        stroke={STROKE}
        strokeWidth="1.3"
      />
      <path
        d="M40 27c0-5 4-10 5.5-12 .8 3 1.4 7-.8 12"
        stroke={STROKE}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <ShorkFace cx={40} cy={42} scale={0.78} />
      <DaisyBloom cx={58} cy={62} scale={0.42} />
    </>
  );
}

function ShorkFace({
  cx,
  cy,
  scale = 1,
  sleepy = false,
  looking = "ahead",
}: {
  cx: number;
  cy: number;
  scale?: number;
  sleepy?: boolean;
  looking?: "ahead" | "right";
}) {
  const r = 4.2 * scale;
  const look = looking === "right" ? 1.6 * scale : 0;
  const eyeY = cy - (sleepy ? 2.4 : 4) * scale;
  const smileY = cy + 8 * scale;
  const eyeCurve = sleepy ? 0.45 * scale : 1.4 * scale;

  return (
    <>
      <circle cx={cx - 8 * scale} cy={cy + 2 * scale} r={r} fill={BLUSH} />
      <circle cx={cx + 8 * scale} cy={cy + 2 * scale} r={r} fill={BLUSH} />
      <path
        d={`M${cx - 7 * scale + look} ${eyeY}c${1.6 * scale} ${eyeCurve} ${3.4 * scale} ${eyeCurve} ${5 * scale} 0`}
        stroke={INK}
        strokeWidth={1.6 * scale}
        strokeLinecap="round"
      />
      <path
        d={`M${cx + 2 * scale + look} ${eyeY}c${1.6 * scale} ${eyeCurve} ${3.4 * scale} ${eyeCurve} ${5 * scale} 0`}
        stroke={INK}
        strokeWidth={1.6 * scale}
        strokeLinecap="round"
      />
      <path
        d={`M${cx - 4 * scale} ${smileY}c${2.4 * scale} ${sleepy ? 1.6 * scale : 2.6 * scale} ${5.6 * scale} ${sleepy ? 1.6 * scale : 2.6 * scale} ${8 * scale} 0`}
        stroke={INK}
        strokeWidth={1.6 * scale}
        strokeLinecap="round"
      />
    </>
  );
}

function DaisyBloom({
  cx,
  cy,
  scale = 1,
}: {
  cx: number;
  cy: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale}) translate(-10 -10)`}>
      <g
        fill={PAPER}
        stroke={SAGE}
        strokeWidth="1.2"
        strokeLinejoin="round"
      >
        <ellipse cx="10" cy="3.2" rx="3.4" ry="6" />
        <ellipse cx="10" cy="16.8" rx="3.4" ry="6" />
        <ellipse cx="3.2" cy="10" rx="6" ry="3.4" />
        <ellipse cx="16.8" cy="10" rx="6" ry="3.4" />
      </g>
      <circle
        cx="10"
        cy="10"
        r="3.6"
        fill={DAISY}
        stroke={STROKE}
        strokeWidth="1.1"
      />
    </g>
  );
}

export function FlowerDoodle({
  className,
  kind = "daisy",
}: {
  className?: string;
  kind?: "daisy" | "clover" | "leaf" | "blush";
}) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" aria-hidden>
      {kind === "daisy" ? (
        <>
          <g
            fill={PAPER}
            stroke={SAGE}
            strokeWidth="1.3"
            strokeLinejoin="round"
          >
            <ellipse cx="40" cy="18" rx="7" ry="13" />
            <ellipse cx="40" cy="62" rx="7" ry="13" />
            <ellipse cx="18" cy="40" rx="13" ry="7" />
            <ellipse cx="62" cy="40" rx="13" ry="7" />
          </g>
          <circle
            cx="40"
            cy="40"
            r="8"
            fill={DAISY}
            stroke={STROKE}
            strokeWidth="1.2"
          />
        </>
      ) : null}
      {kind === "blush" ? (
        <>
          <g
            fill={BLUSH}
            stroke="var(--picnic-strawberry)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          >
            <ellipse cx="40" cy="22" rx="6" ry="12" />
            <ellipse cx="40" cy="58" rx="6" ry="12" />
            <ellipse cx="22" cy="40" rx="12" ry="6" />
            <ellipse cx="58" cy="40" rx="12" ry="6" />
          </g>
          <circle cx="40" cy="40" r="6.5" fill={DAISY} />
        </>
      ) : null}
      {kind === "clover" ? (
        <>
          <path
            d="M40 34c-10-14-24-7-17 7-10 3-10 17 3 17h28c13 0 13-14 3-17 7-14-7-21-17-7Z"
            fill={LEAF}
            stroke={SAGE_DEEP}
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M40 52c2 8 7 14 12 16"
            stroke={SAGE_DEEP}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </>
      ) : null}
      {kind === "leaf" ? (
        <>
          <path
            d="M20 56c4-22 18-36 40-40-4 22-18 36-40 40Z"
            fill={LEAF}
            stroke={SAGE_DEEP}
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M26 52c10-10 20-18 30-24"
            stroke={SAGE_DEEP}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </>
      ) : null}
    </svg>
  );
}
