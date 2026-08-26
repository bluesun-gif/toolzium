import JsonLd from "@/components/seo/json-ld";
import { ToolsDirectoryClient } from "@/components/tools/tools-directory-client";
import { ToolsData, TOTAL_TOOLS_COUNT } from "@/data/tools";
import { siteURL } from "@/lib/constants";
import {
  buildDynamicKeywords,
  mergeKeywords,
  siteDescriptionFallback,
} from "@/lib/seo-tools";
import type { Metadata } from "next";

const STATIC_KEYWORDS = [
  "online tools",
  "url shortener",
  "free online tools",
  "developer tools",
  "pdf tools",
  "image tools",
  "image converter",
  "text utilities",
  "json formatter",
  "qr code generator",
  "base64 encoder",
  "hash generator",
  "password generator",
  "seo tools",
  "calculators",
  "unit converter",
  "bmi calculator",
  "currency converter",
  "regex tester",
  "free tools",
  "privacy friendly",
  "no signup required",
  "web utilities",
];

const DYNAMIC_KEYWORDS = buildDynamicKeywords(ToolsData);
const KEYWORDS = mergeKeywords(STATIC_KEYWORDS, DYNAMIC_KEYWORDS);

const description =
  `Browse ${TOTAL_TOOLS_COUNT}+ free online tools for developers and professionals. URL shortener with QR codes, JSON formatter, image converter, Base64 encoder, hash generator, calculators, SEO tools, and more. No signup required, privacy-first.`;
const smartDescription = description || siteDescriptionFallback(ToolsData);

export const metadata: Metadata = {
  title: "All Free Online Tools — Fast, Private, In-Browser Utilities",
  description: smartDescription,
  keywords: KEYWORDS,
  openGraph: {
    title: "All Free Online Tools — Toolzium",
    description: smartDescription,
    url: `${siteURL}/tools`,
    type: "website",
    siteName: "Toolzium",
    images: [
      {
        url: `${siteURL}/assets/toolzium-preview.png`,
        width: 1200,
        height: 630,
        alt: "Toolzium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Toolzium",
    creator: "@Toolzium",
    title: "All Free Online Tools — Toolzium",
    description: smartDescription,
    images: [`${siteURL}/assets/toolzium-preview.png`],
  },
  alternates: {
    canonical: `${siteURL}/tools`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolsIndexPage() {
  const navLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Toolzium Categories",
    itemListElement: ToolsData.map((c, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.title,
      url: `${siteURL}${c.url}`,
    })),
  };

  return (
    <main className="scroll-smooth py-2 sm:py-4">
      <JsonLd data={navLd} />
      <ToolsDirectoryClient />
    </main>
  );
}
