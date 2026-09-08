import { cn } from "@/lib/utils";

type TortolMarkProps = {
  className?: string;
  title?: string;
};

const STROKE = "var(--picnic-ink-soft)";
const INK = "var(--picnic-ink)";
const BLUSH = "var(--picnic-blush)";
const SAGE = "var(--picnic-sage)";
const SAGE_DEEP = "var(--picnic-sage-deep)";

export function TortolMark({ className, title }: TortolMarkProps) {
  const label = title ?? "Tortol";

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
      <Tortol />
    </svg>
  );
}

function Tortol() {
  return (
    <>
      <ellipse
        cx="22"
        cy="60"
        rx="8"
        ry="6"
        fill="currentColor"
        stroke={STROKE}
        strokeWidth="1.5"
      />
      <ellipse
        cx="46"
        cy="62"
        rx="8"
        ry="6"
        fill="currentColor"
        stroke={STROKE}
        strokeWidth="1.5"
      />
      <path
        d="M12 44c-6 4-8 10-6 14 5-2 8-6 10-11"
        fill="currentColor"
        stroke={STROKE}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <ellipse cx="36" cy="46" rx="24" ry="18" fill={SAGE} />
      <ellipse
        cx="36"
        cy="46"
        rx="24"
        ry="18"
        stroke={STROKE}
        strokeWidth="1.5"
      />
      <path
        d="M22 40c3-7 8-11 14-11 6 0 11 4 14 11"
        stroke={SAGE_DEEP}
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M36 30v20"
        stroke={SAGE_DEEP}
        strokeWidth="1.35"
        strokeLinecap="round"
      />

      <circle cx="60" cy="36" r="13.5" fill="currentColor" />
      <circle cx="60" cy="36" r="13.5" stroke={STROKE} strokeWidth="1.5" />
      <TortolFace cx={61} cy={37} />
    </>
  );
}

function TortolFace({ cx, cy }: { cx: number; cy: number }) {
  return (
    <>
      <circle cx={cx - 5.5} cy={cy + 1.5} r={3.4} fill={BLUSH} />
      <circle cx={cx + 5.5} cy={cy + 1.5} r={3.4} fill={BLUSH} />
      <path
        d={`M${cx - 6} ${cy - 3.2}c1.2 1.1 2.6 1.1 3.8 0`}
        stroke={INK}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d={`M${cx + 2.2} ${cy - 3.2}c1.2 1.1 2.6 1.1 3.8 0`}
        stroke={INK}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d={`M${cx - 3} ${cy + 6}c1.8 2 4.2 2 6 0`}
        stroke={INK}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </>
  );
}

