import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Lora, Nunito, Geist } from "next/font/google";
import { PicnicShell } from "@/components/reader/PicnicShell";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
  title: "Vivienne Shork",
  description: "A private picnic of letters.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
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
      className={cn("h-full", "antialiased", nunito.variable, fraunces.variable, lora.variable, caveat.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full bg-linen font-sans text-ink">
        <PicnicShell>{children}</PicnicShell>
      </body>
    </html>
  );
}
