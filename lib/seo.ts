import { env } from "@/lib/env";
import type { Metadata } from "next";

const SITE_URL = env.app.siteUrl || "https://toolzium.com";
const SITE_NAME = "Toolzium";
const SITE_TWITTER = "@toolzium";
const DEFAULT_IMAGE = `${SITE_URL}/assets/tools-cube.jpg`;

type BuildMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
};

export function buildMetadata(input: BuildMetaInput): Metadata {
  const url = new URL(input.path, SITE_URL).toString();
  const image = input.image ?? DEFAULT_IMAGE;

  return {
    title: {
      default: input.title,
      template: `%s`,
    },
    description: input.description,
    keywords: input.keywords ?? [
      "url shortener",
      "online tools",
      "developer tools",
      "text utilities",
      "pdf tools",
      "image converters",
      "calculators",
      "free tools",
      "privacy friendly",
    ],
    category: "Utilities",

    alternates: { canonical: url },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title: input.title,
      description: input.description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: input.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: SITE_TWITTER,
      creator: SITE_TWITTER,
      title: input.title,
      description: input.description,
      images: [image],
    },

    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },

    applicationName: "Toolzium",
    other: {
      "og:locale": "en_US",
    },
  };
}

export type FAQItem = {
  question: string;
  answer: string;
};

export function buildToolJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  categoryName?: string;
  categoryPath?: string;
  faqs?: FAQItem[];
}) {
  const url = `${SITE_URL}${opts.path}`;
  const catName = opts.categoryName ?? "Tools";
  const catUrl = `${SITE_URL}${opts.categoryPath ?? "/tools"}`;

  const schemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: `${opts.name} — ${SITE_NAME}`,
      url,
      description: opts.description,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      isAccessibleForFree: true,
      inLanguage: "en",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: catName,
          item: catUrl,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: opts.name,
          item: url,
        },
      ],
    },
  ];

  const faqsToRender = (opts.faqs && opts.faqs.length > 0) ? opts.faqs : [
    {
      question: `How does the ${opts.name} work?`,
      answer: `Toolzium's ${opts.name} runs instantly in your browser to ${opts.description.toLowerCase()}. No sign-up or software installation required.`,
    },
    {
      question: `Is the ${opts.name} 100% free to use?`,
      answer: `Yes, the ${opts.name} is 100% free with unlimited usage, no daily limits, and no account required.`,
    },
    {
      question: `Is my data secure when using the ${opts.name}?`,
      answer: `Yes, all processing runs locally within your browser context. Your input data is never logged, stored, or uploaded to any third-party servers.`,
    },
  ];

  schemas.push({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsToRender.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  });

  return schemas;
}
