import Link from "next/link";
import { logoutAdmin } from "@/app/admin/login/actions";

export function AdminNav() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-wicker pb-4">
      <p className="font-sans text-sm font-semibold text-ink-soft">Desk</p>
      <nav className="flex flex-wrap items-center gap-1" aria-label="Admin">
        <Link
          href="/admin"
          className="inline-flex min-h-11 items-center rounded-full px-3 font-sans text-sm font-semibold text-ink hover:bg-cream"
        >
          Letters
        </Link>
        <Link
          href="/admin/letters/new"
          className="inline-flex min-h-11 items-center rounded-full px-3 font-sans text-sm font-semibold text-ink hover:bg-cream"
        >
          New
        </Link>
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="inline-flex min-h-11 items-center rounded-full px-3 font-sans text-sm font-semibold text-ink-soft hover:bg-cream hover:text-ink"
          >
            Log out
          </button>
        </form>
      </nav>
    </header>
  );
}
