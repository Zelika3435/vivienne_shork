import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Lora, Nunito } from "next/font/google";
import { PicnicShell } from "@/components/reader/PicnicShell";
import { privateOpenGraph, privateRobots } from "@/lib/privacy";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "From Akhi Tortol",
  description: "A private picnic of letters.",
  robots: privateRobots,
  openGraph: privateOpenGraph,
  twitter: {
    card: "summary",
    title: privateOpenGraph.title,
    description: privateOpenGraph.description,
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF5EE",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${fraunces.variable} ${lora.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-linen font-sans text-ink">
        <PicnicShell>{children}</PicnicShell>
      </body>
    </html>
  );
}
