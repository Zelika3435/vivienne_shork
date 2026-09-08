import { TortolMark } from "@/components/reader/TortolMark";

type WordmarkProps = {
  className?: string;
};

export function Wordmark({ className }: WordmarkProps) {
  return (
    <div
      className={`picnic-shadow relative inline-flex items-center rounded-[1.35rem] border border-wicker bg-paper py-2 pl-4 pr-12 ${className ?? ""}`}
    >
      <p className="font-display text-[1.2rem] font-semibold leading-none tracking-tight text-ink">
        From Akhi Tortol
      </p>
      <TortolMark className="absolute -right-1.5 top-1/2 size-12 -translate-y-1/2" />
    </div>
  );
}
