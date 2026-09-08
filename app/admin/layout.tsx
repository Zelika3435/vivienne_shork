import type { Metadata } from "next";
import { privatePageMetadata } from "@/lib/privacy";

export const metadata: Metadata = {
  ...privatePageMetadata,
  title: "Desk · From Akhi Tortol",
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div data-admin-desk>{children}</div>;
}
