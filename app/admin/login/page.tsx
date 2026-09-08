import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { Wordmark } from "@/components/reader/Wordmark";
import { getAdminUser } from "@/lib/auth";
import { privatePageMetadata } from "@/lib/privacy";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  ...privatePageMetadata,
  title: "Log in · From Akhi Tortol",
};

export default async function AdminLoginPage() {
  if (await getAdminUser()) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-[calc(100dvh-6rem)] items-center justify-center">
      <section className="w-full max-w-[24rem] rounded-[1.75rem] border border-wicker bg-paper px-6 py-8 md:px-8 md:py-10">
        <Wordmark />
        <h1 className="mt-6 font-sans text-xl font-semibold text-ink">Log in</h1>
        <p className="mt-2 font-sans text-sm text-ink-soft">
          The desk is just for writing.
        </p>
        <LoginForm />
      </section>
    </main>
  );
}
