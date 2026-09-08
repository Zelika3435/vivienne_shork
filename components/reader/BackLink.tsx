import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type BackLinkProps = {
  className?: string;
};

export function BackLink({ className }: BackLinkProps) {
  return (
    <Link
      href="/"
      className={`inline-flex min-h-11 items-center gap-1 rounded-full py-1 pr-3 font-sans text-[0.95rem] font-semibold text-sage-deep no-underline transition-colors duration-150 hover:text-sage ${className ?? ""}`}
    >
      <ChevronLeft aria-hidden className="size-5 shrink-0" strokeWidth={2.25} />
      Back to the picnic
    </Link>
  );
}
