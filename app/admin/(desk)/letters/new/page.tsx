import type { Metadata } from "next";
import { AdminBackLink } from "@/components/admin/AdminBackLink";
import { LetterForm } from "@/components/admin/LetterForm";
import { SetupNotice } from "@/components/admin/SetupNotice";
import { getNextSortOrder, getPinnedCount, probeLettersTable } from "@/lib/letters";
import { privatePageMetadata } from "@/lib/privacy";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  ...privatePageMetadata,
  title: "New letter · From Akhi Tortol",
};

export default async function NewLetterPage() {
  const table = await probeLettersTable();

  if (!table.ready) {
    return (
      <main className="flex flex-col gap-5">
        <AdminBackLink />
        <div className="flex flex-col gap-1">
          <h1 className="font-sans text-2xl font-semibold text-ink">New letter</h1>
        </div>
        <SetupNotice error={table.error} />
      </main>
    );
  }

  const defaultSortOrder = await getNextSortOrder();
  const otherPinnedCount = await getPinnedCount();

  return (
    <main className="flex flex-col gap-5">
      <AdminBackLink />
      <div className="flex flex-col gap-1">
        <h1 className="font-sans text-2xl font-semibold text-ink">New letter</h1>
        <p className="font-sans text-sm text-ink-soft">
          Write it first. Publish when it’s ready.
        </p>
      </div>
      <LetterForm
        mode="create"
        defaultSortOrder={defaultSortOrder}
        otherPinnedCount={otherPinnedCount}
      />
    </main>
  );
}
