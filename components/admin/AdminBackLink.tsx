import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type AdminBackLinkProps = {
  href?: string;
  children?: string;
};

export function AdminBackLink({
  href = "/admin",
  children = "Back to letters",
}: AdminBackLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 w-fit items-center gap-1 font-sans text-sm font-semibold text-sage-deep"
    >
      <ChevronLeft className="size-4" aria-hidden />
      {children}
    </Link>
  );
}
