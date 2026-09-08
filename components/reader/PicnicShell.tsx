import type { ReactNode } from "react";
import { FlowerDoodle, ShorkMark } from "@/components/reader/ShorkMark";

type PicnicShellProps = {
  children: ReactNode;
};

export function PicnicShell({ children }: PicnicShellProps) {
  return (
    <div className="group/shell relative min-h-[100dvh] bg-linen text-ink">
      <div
        className="picnic-gingham pointer-events-none absolute inset-0 group-has-[[data-admin-desk]]/shell:hidden"
        aria-hidden
      />
      <div className="group-has-[[data-admin-desk]]/shell:hidden">
        <EdgeDoodles />
      </div>
      <div
        className="relative z-10 mx-auto w-full max-w-[1080px] group-has-[[data-admin-desk]]/shell:max-w-3xl"
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
    <div
      className="picnic-edge-doodles pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <FlowerDoodle
        kind="daisy"
        className="absolute -left-3 top-20 size-16 opacity-70 md:left-3 md:top-24 md:size-20"
      />
      <FlowerDoodle
        kind="blush"
        className="absolute -right-4 top-36 size-12 opacity-55 md:right-8 md:top-28 md:size-14"
      />
      <FlowerDoodle
        kind="leaf"
        className="absolute -left-2 bottom-28 size-12 opacity-50 md:left-6 md:bottom-36 md:size-14"
      />
      <ShorkMark
        pose="peek"
        className="absolute -left-4 bottom-8 size-16 opacity-65 md:left-2 md:bottom-10 md:size-20"
        title=""
      />
      <ShorkMark
        pose="nap"
        className="absolute -right-3 bottom-12 size-[4.5rem] opacity-80 md:right-6 md:bottom-16 md:size-24"
        title=""
      />
    </div>
  );
}
