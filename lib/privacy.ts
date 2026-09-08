import type { Metadata } from "next";

export const privateRobots: Metadata["robots"] = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
  },
};

export const privateOpenGraph = {
  title: "Vivienne Shork",
  description: "A private picnic of letters.",
} as const;

export const privatePageMetadata = {
  title: "Vivienne Shork",
  description: "A private picnic of letters.",
  robots: privateRobots,
  openGraph: privateOpenGraph,
} satisfies Metadata;
