import JsonLd from "@/components/seo/json-ld";
import { PackingWeightClient } from "@/components/tools/travel/packing-weight-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Packing Weight Calculator | Toolzium",
  description: "Calculate your luggage weight before traveling to avoid overweight baggage fees.",
  path: "/tools/travel/packing-weight",
  keywords: ["luggage weight calculator", "packing list weight", "travel baggage weight", "overweight baggage"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/travel/packing-weight`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Packing Weight Calculator", url: toolUrl, description: "Calculate your luggage weight before traveling to avoid overweight baggage fees.", applicationCategory: "TravelApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: `${siteURL}/tools#cat-travel` }, { "@type": "ListItem", position: 3, name: "Packing Weight Calculator", item: toolUrl }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <PackingWeightClient />
    </div>
  );
}
