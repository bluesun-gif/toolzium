import JsonLd from "@/components/seo/json-ld";
import TypingTestClient from "@/components/tools/util/typing-test-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Typing Speed Test Tool",
  description: "Test and improve your typing speed (WPM) and accuracy with our free online typing test. Features multiple difficulty levels including easy, medium, and programming texts.",
  path: "/tools/util/typing-test",
  keywords: ["typing speed test", "wpm test", "typing test online", "words per minute", "keyboard speed test", "improve typing speed"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/util/typing-test`;
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Typing Speed Test — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description: "Test and improve your typing speed and accuracy with real-time feedback and WPM calculation.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["WPM calculation", "Accuracy tracking", "Multiple difficulty levels", "Real-time character highlighting"],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Utilities", item: `${siteURL}/tools#cat-util` },
      { "@type": "ListItem", position: 3, name: "Typing Speed Test", item: toolUrl },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <TypingTestClient />
    </div>
  );
}
