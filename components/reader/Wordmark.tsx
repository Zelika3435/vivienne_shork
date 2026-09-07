import { ShorkMark } from "@/components/reader/ShorkMark";

type WordmarkProps = {
  className?: string;
};

export function Wordmark({ className }: WordmarkProps) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <p className="font-display text-[1.25rem] font-semibold leading-none tracking-tight text-ink">
        Vivienne Shork
      </p>
      <ShorkMark pose="daisy" className="size-10 shrink-0" />
    </div>
  );
}
