import JsonLd from "@/components/seo/json-ld";
import WordCounterClient from "@/components/tools/text/word-counter-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Free Word Counter & Character Count Tool | Toolzium",
  description:
    "Count words, characters with/without spaces, sentences, and paragraphs. Estimate reading time, calculate keyword density, and analyze tone for free.",
  path: "/tools/text/word-counter",
  keywords: [
    "word counter",
    "character counter",
    "character count online",
    "count words",
    "count characters",
    "reading time calculator",
    "speaking time estimator",
    "keyword density analyzer",
    "character count for twitter",
    "character count for instagram",
    "Toolzium",
  ],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/text/word-counter`;

  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Word Counter & Character Count Tool — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    description:
      "Count words, characters, sentences, paragraphs, reading speed, and keyword density in real-time. 100% free and client-side private.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Word & character counts (with/without spaces)",
      "Sentences, lines, and paragraphs",
      "Estimated reading and speaking time",
      "Keyword density analyzer",
      "AI tone & writing quality analysis",
      "1-click UPPERCASE, lowercase, Title Case, and slugify",
      "Privacy-first: 100% in-browser processing",
    ],
    creator: {
      "@type": "Organization",
      name: "Toolzium",
      url: "https://toolzium.com",
    },
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteURL}` },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 3, name: "Word Counter", item: toolUrl },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you count characters with and without spaces?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Our word counter displays both total character count (including spaces) and character count excluding spaces, allowing you to easily match social media character limits for Twitter/X, Instagram, and LinkedIn.",
        },
      },
      {
        "@type": "Question",
        name: "How is reading and speaking time calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Reading time is calculated using an average reading pace of 200 words per minute (WPM). Speaking time is calculated at 130 WPM, which represents standard presentation and teleprompter speeds.",
        },
      },
      {
        "@type": "Question",
        name: "Is my text uploaded or stored on any server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Toolzium operates 100% client-side in your web browser. Your text is processed locally and is never sent to, stored on, or analyzed by external servers.",
        },
      },
      {
        "@type": "Question",
        name: "What are common social media character limits?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Twitter/X posts: 280 characters. Instagram bios: 150 characters; captions: 2,200 characters. LinkedIn posts: 3,000 characters. TikTok bios: 80 characters.",
        },
      },
      {
        "@type": "Question",
        name: "What is keyword density and why does it matter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Keyword density measures how frequently a word appears relative to total word count. It helps writers and SEO specialists avoid keyword stuffing while ensuring key topics are covered effectively.",
        },
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <WordCounterClient />
    
      <RelatedTools currentToolUrl="/tools/text/word-counter" />
</div>
  );
}
