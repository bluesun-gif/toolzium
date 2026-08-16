import JsonLd from "@/components/seo/json-ld";
import { ExchangeTrendClient } from "@/components/tools/travel/exchange-trend-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Currency Rate Trend Comparison Table | Toolzium",
  description: "Compare travel currency exchange rates and historical trend rates for top travel destinations.",
  path: "/tools/travel/exchange-trend",
  keywords: ["currency exchange", "exchange rates", "currency trend", "travel budget"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/travel/exchange-trend";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Currency Rate Trend Comparison Table", url: toolUrl, description: "Compare travel currency exchange rates and historical trend rates for top travel destinations.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: siteURL + "/tools#cat-travel" }, { "@type": "ListItem", position: 3, name: "Currency Rate Trend Comparison Table", item: toolUrl }] };
  
  return (
    <div className={"space-y-4"}>
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <ExchangeTrendClient />
    
      <RelatedTools currentToolUrl="/tools/travel/exchange-trend" />
</div>
  );
}
