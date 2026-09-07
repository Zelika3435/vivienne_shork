import type { ReactNode } from "react";

type PicnicShellProps = {
  children: ReactNode;
};

export function PicnicShell({ children }: PicnicShellProps) {
  return (
    <div className="relative min-h-[100dvh] bg-linen text-ink">
      <div
        className="picnic-gingham pointer-events-none absolute inset-0"
        aria-hidden
      />
      <EdgeDoodles />
      <div
        className="relative z-10 mx-auto w-full max-w-[1080px]"
        style={{
          paddingTop: "max(1.5rem, env(safe-area-inset-top))",
          paddingRight: "max(1.25rem, env(safe-area-inset-right))",
          paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))",
          paddingLeft: "max(1.25rem, env(safe-area-inset-left))",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function EdgeDoodles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg
        viewBox="0 0 80 80"
        className="absolute -left-3 top-24 size-16 opacity-70 md:left-4 md:size-20"
        fill="none"
      >
        <g fill="#FFF8F1" stroke="#7A9E6D" strokeWidth="1.3" strokeLinejoin="round">
          <ellipse cx="40" cy="18" rx="7" ry="13" />
          <ellipse cx="40" cy="62" rx="7" ry="13" />
          <ellipse cx="18" cy="40" rx="13" ry="7" />
          <ellipse cx="62" cy="40" rx="13" ry="7" />
        </g>
        <circle cx="40" cy="40" r="8" fill="#F0D78C" stroke="#7A7468" strokeWidth="1.2" />
      </svg>
      <svg
        viewBox="0 0 80 80"
        className="absolute -right-2 bottom-16 size-20 opacity-80 md:right-6 md:bottom-20 md:size-24"
        fill="none"
      >
        <ellipse cx="42" cy="48" rx="22" ry="18" fill="#C4B5A8" />
        <path d="M42 30c0-7 5-14 7-16 1 4 2 9-1 16" fill="#C4B5A8" />
        <ellipse cx="42" cy="48" rx="22" ry="18" stroke="#7A7468" strokeWidth="1.5" />
        <path
          d="M42 30c0-7 5-14 7-16 1 4 2 9-1 16"
          stroke="#7A7468"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="34" cy="50" r="3.6" fill="#F4C7C2" />
        <circle cx="50" cy="50" r="3.6" fill="#F4C7C2" />
        <path d="M35 44c1.4 1.2 3 1.2 4.4 0" stroke="#3D332C" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M45 44c1.4 1.2 3 1.2 4.4 0" stroke="#3D332C" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M38 55c1.8 2 4.2 2 6 0" stroke="#3D332C" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
