import { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import AiTextHumanizerClient from "@/components/tools/writing/ai-text-humanizer-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
const TITLE = "AI Text Humanizer | Toolzium";
const DESCRIPTION =
  "Free AI text humanizer that rewrites robotic AI content into natural, human-sounding writing that bypasses GPTZero, Turnitin, and Originality.ai. No signup, instant results.";
const PATH = "/tools/writing/ai-text-humanizer";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "ai text humanizer",
    "humanize ai text",
    "ai humanizer",
    "humanize text",
    "bypass ai detector",
    "undetectable ai",
    "ai detector bypass",
    "humanize chatgpt text",
    "make ai text sound human",
    "ai text rewriter",
    "human writing generator",
    "free ai humanizer",
  ],
});

export default function AiTextHumanizerPage() {
  const toolUrl = `${siteURL}${PATH}`;

  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI Text Humanizer — Toolzium",
    url: toolUrl,
    applicationCategory: "WritingApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description:
      "Rewrite AI-generated text into natural, human-sounding writing that passes AI content detectors. Free, instant, and private.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Humanizes ChatGPT, Claude, Gemini, and Jasper output",
      "Bypasses GPTZero, Turnitin, Originality.ai, Writer.com",
      "Adjustable tone: casual, professional, academic, friendly",
      "Preserves meaning while varying vocabulary and rhythm",
      "100% client-to-AI privacy — no content stored",
      "Free with no word limit or watermark",
    ],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteURL}` },
      { "@type": "ListItem", position: 2, name: "Writing Tools", item: `${siteURL}/tools#cat-writing` },
      { "@type": "ListItem", position: 3, name: "AI Text Humanizer", item: toolUrl },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does the AI Text Humanizer work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The tool sends your text to a large language model that rewrites it using natural sentence variety, idiomatic phrasing, and human-like rhythm while preserving your original meaning. The result reads as if a person wrote it.",
        },
      },
      {
        "@type": "Question",
        name: "Can it bypass AI content detectors like GPTZero and Turnitin?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Humanized text is engineered to reduce AI-perplexity and burstiness signatures that detectors look for, meaning it typically passes GPTZero, Turnitin AI Writing, Originality.ai, and Writer.com. No tool guarantees 100%, but our humanizer is tuned specifically for undetectability.",
        },
      },
      {
        "@type": "Question",
        name: "Is my text kept private?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Your input is transmitted only to the inference API for processing and is not stored on Toolzium servers. For sensitive documents, review your institution's policy before submitting.",
        },
      },
      {
        "@type": "Question",
        name: "What writing tones are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can humanize in casual, professional, academic, friendly, or concise tones to match your audience — from blog posts and essays to emails and marketing copy.",
        },
      },
      {
        "@type": "Question",
        name: "Is the AI Text Humanizer free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Toolzium's humanizer is completely free with no word cap, no account, and no watermark.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <AiTextHumanizerClient />
    
      <RelatedTools currentToolUrl="/tools/writing/ai-text-humanizer" />
</>
  );
}
