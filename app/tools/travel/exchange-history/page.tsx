import JsonLd from "@/components/seo/json-ld";
import { ExchangeHistoryClient } from "@/components/tools/travel/exchange-history-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Currency Exchange Rate History | Toolzium",
  description: "View historical exchange rate trends.",
  path: "/tools/travel/exchange-history",
  keywords: ["currency", "exchange", "rate", "history", "travel"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/travel/exchange-history";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Exchange Rate History", url: toolUrl, description: "Historical exchange rates.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: siteURL + "/tools#cat-travel" }, { "@type": "ListItem", position: 3, name: "Exchange Rate History", item: toolUrl }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <ExchangeHistoryClient />
    
      <RelatedTools currentToolUrl="/tools/travel/exchange-history" />
</div>
  );
}
