import JsonLd from "@/components/seo/json-ld";
import StopwatchClient from "@/components/tools/util/stopwatch-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Online Stopwatch - Precision Timer with Laps",
  description: "A free, accurate online stopwatch with millisecond precision, lap recording, and keyboard shortcuts. Use our stopwatch for timing tasks, sports, or study sessions.",
  path: "/tools/util/stopwatch",
  keywords: ["online stopwatch", "stopwatch timer", "stopwatch with laps", "precision stopwatch", "millisecond timer", "digital stopwatch", "Toolzium"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/util/stopwatch`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Online Stopwatch — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description: "A free, accurate online stopwatch with millisecond precision, lap recording, and keyboard shortcuts. Use our stopwatch for timing tasks, sports, or study sessions.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Millisecond precision timing",
      "Lap time recording",
      "Keyboard shortcuts",
      "Copy laps to clipboard",
      "Responsive design"
    ],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Utilities", item: `${siteURL}/tools#cat-utilities` },
      { "@type": "ListItem", position: 3, name: "Stopwatch", item: toolUrl },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <StopwatchClient />
    
      <RelatedTools currentToolUrl="/tools/util/stopwatch" />
</div>
  );
}
