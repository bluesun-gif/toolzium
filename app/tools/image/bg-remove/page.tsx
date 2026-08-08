import { Metadata } from "next";
import BgRemoveClient from "@/components/tools/image/bg-remove-client";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/json-ld";
import { siteURL } from "@/lib/constants";

const title = "Background Remover — Remove Image Background Free Online";
const description =
  "Remove background from any image instantly using AI in your browser. Get a transparent PNG in seconds. Free, private, no upload to servers — no signup required.";
const toolUrl = `${siteURL}/tools/image/bg-remove`;

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/tools/image/bg-remove",
  keywords: [
    "background remover",
    "remove image background",
    "transparent background",
    "remove background free",
    "AI background remover",
    "background eraser online",
    "PNG transparent background",
    "photo background remover",
    "no upload background remover",
    "private background remover",
    "product photo background remove",
    "portrait background remove",
    "remove.bg alternative",
    "free background remover no watermark",
    "background removal tool",
  ],
});

export default function BgRemovePage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Background Remover — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description:
      "Free AI-powered background remover that runs entirely in your browser. Upload any image and get a transparent PNG instantly — no uploads, no signup, completely private.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Remove background with AI precision",
      "Instant mode for solid-color backgrounds",
      "100% client-side — no image uploads",
      "Download transparent PNG",
      "Preview with custom backdrop color",
      "Split comparison slider",
      "Works on portraits, products, and logos",
      "No watermark, no signup required",
      "Free forever",
    ],
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Image", item: `${siteURL}/tools#cat-image` },
      { "@type": "ListItem", position: 3, name: "Background Remover", item: toolUrl },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Does this tool upload my images to a server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The entire AI model runs locally in your browser using WebAssembly. Your images are processed on your device and never sent to any server. This is different from services like remove.bg which upload your files to their cloud.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between AI Mode and Instant Mode?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Instant Mode uses a flood-fill algorithm — perfect for solid-color backgrounds like white product photo backdrops. It processes in under a second. AI Precision Mode uses a neural network for complex scenes involving hair, fur, transparent objects, or detailed backgrounds.",
        },
      },
      {
        "@type": "Question",
        name: "What output format does the tool produce?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The tool always downloads a transparent PNG file. PNG is the only widely-supported format that preserves alpha-channel transparency.",
        },
      },
      {
        "@type": "Question",
        name: "Why does AI Mode take longer than other background removers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Commercial tools like remove.bg run their models on powerful GPU servers in the cloud. Our tool runs the AI model directly in your browser on your CPU, which is slower but means your images stay private.",
        },
      },
      {
        "@type": "Question",
        name: "What image sizes and formats are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can upload JPG, PNG, WebP, and most common image formats. There is no strict file size limit, but very large images above 10MB may take longer in AI Mode. For best results, use images up to 4000×4000 pixels.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <BgRemoveClient />
    </>
  );
}
