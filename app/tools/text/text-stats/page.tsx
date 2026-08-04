import JsonLd from "@/components/seo/json-ld";
import { TextStatsClient } from "@/components/tools/text/text-stats-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Text Statistics & Analyzer | Toolzium",
  description: "Advanced text analysis tool for word count, readability score, reading time, and lexical density.",
  path: "/tools/text/text-stats",
  keywords: ["text stats", "word count", "readability checker", "text analyzer", "lexical density"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/text/text-stats`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Text Statistics Analyzer", url: toolUrl, description: "Advanced text analysis tool.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Text Tools", item: `${siteURL}/tools#cat-text` }, { "@type": "ListItem", position: 3, name: "Text Statistics", item: toolUrl }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <TextStatsClient />
    </div>
  );
}
