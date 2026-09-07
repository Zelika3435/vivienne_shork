type ShorkPose = "face" | "daisy";

type ShorkMarkProps = {
  pose?: ShorkPose;
  className?: string;
  title?: string;
};

export function ShorkMark({
  pose = "face",
  className,
  title,
}: ShorkMarkProps) {
  const label = title ?? (pose === "daisy" ? "Shork with a daisy" : "Shork");

  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      role="img"
      aria-label={label}
      fill="none"
    >
      <title>{label}</title>
      <ellipse cx="40" cy="46" rx="24" ry="20" fill="#C4B5A8" />
      <path
        d="M40 26c0-8 6-16 8-18 1.2 4 2 10-1 18"
        fill="#C4B5A8"
      />
      <path
        d="M58 40c8 1 14 6 16 10-6 1-12-1-16-6"
        fill="#B7D0DC"
      />
      <path
        d="M22 48c-7 4-10 10-10 14 6-1 12-5 14-10"
        fill="#C4B5A8"
      />
      <ellipse cx="40" cy="46" rx="24" ry="20" stroke="#7A7468" strokeWidth="1.5" />
      <path
        d="M40 26c0-8 6-16 8-18 1.2 4 2 10-1 18"
        stroke="#7A7468"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M58 40c8 1 14 6 16 10-6 1-12-1-16-6"
        stroke="#7A7468"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 48c-7 4-10 10-10 14 6-1 12-5 14-10"
        stroke="#7A7468"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="48" r="4.2" fill="#F4C7C2" />
      <circle cx="48" cy="48" r="4.2" fill="#F4C7C2" />
      <path
        d="M33 42c1.6 1.4 3.4 1.4 5 0"
        stroke="#3D332C"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M42 42c1.6 1.4 3.4 1.4 5 0"
        stroke="#3D332C"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M36 54c2.4 2.6 5.6 2.6 8 0"
        stroke="#3D332C"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {pose === "daisy" ? <DaisyInFin /> : null}
    </svg>
  );
}

function DaisyInFin() {
  return (
    <g transform="translate(42 6)">
      <circle cx="8" cy="8" r="3.2" fill="#F0D78C" />
      <g fill="#FFF8F1" stroke="#7A9E6D" strokeWidth="1.1" strokeLinejoin="round">
        <ellipse cx="8" cy="2.2" rx="2.1" ry="3.4" />
        <ellipse cx="8" cy="13.8" rx="2.1" ry="3.4" />
        <ellipse cx="2.2" cy="8" rx="3.4" ry="2.1" />
        <ellipse cx="13.8" cy="8" rx="3.4" ry="2.1" />
        <ellipse cx="3.8" cy="3.8" rx="2.4" ry="3.1" transform="rotate(-45 3.8 3.8)" />
        <ellipse cx="12.2" cy="3.8" rx="2.4" ry="3.1" transform="rotate(45 12.2 3.8)" />
      </g>
      <circle cx="8" cy="8" r="2.4" fill="#F0D78C" stroke="#7A7468" strokeWidth="1" />
    </g>
  );
}
