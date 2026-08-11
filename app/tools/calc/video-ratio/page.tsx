import JsonLd from "@/components/seo/json-ld";
import VideoRatioClient from "@/components/tools/calc/video-ratio-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Aspect Ratio Calculator for Video | Toolzium",
  description:
    "Calculate video aspect ratios and resolutions, and scale dimensions while maintaining ratio.",
  path: "/tools/calc/video-ratio",
  keywords: [
    "aspect ratio",
    "video resolution",
    "scale video",
    "aspect ratio calculator",
  ],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/calc/video-ratio`;
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Aspect Ratio Calculator for Video",
    url: toolUrl,
    description: "Calculate video aspect ratios and resolutions.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculators",
        item: `${siteURL}/tools#cat-calc`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Aspect Ratio Calculator for Video",
        item: toolUrl,
      },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an aspect ratio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Aspect ratio is the proportional relationship between the width and height of a video or image.",
        },
      },
      {
        "@type": "Question",
        name: "What is 1080p resolution?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "1080p is a high-definition video resolution of 1920x1080 pixels.",
        },
      },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <VideoRatioClient />
    </div>
  );
}
