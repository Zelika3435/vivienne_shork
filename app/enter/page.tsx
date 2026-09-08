import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { GateCard } from "@/components/reader/GateCard";
import { hasValidGateCookie } from "@/lib/gate-session";
import { isGateEnabled } from "@/lib/gate";
import { privatePageMetadata } from "@/lib/privacy";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  ...privatePageMetadata,
  title: "Vivienne Shork",
};

export default async function EnterPage() {
  if (!isGateEnabled() || (await hasValidGateCookie())) {
    redirect("/");
  }

  return (
    <main className="picnic-enter flex min-h-[calc(100dvh-6rem)] items-center justify-center">
      <GateCard />
    </main>
  );
}
