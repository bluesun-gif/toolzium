import JsonLd from "@/components/seo/json-ld";
import { TravelBudgetMatrixClient } from "@/components/tools/travel/travel-budget-matrix-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Travel Budget Currency Comparison Matrix | Toolzium",
  description: "Compare travel budgets across multiple destination currencies.",
  path: "/tools/travel/travel-budget-matrix",
  keywords: ["travel budget", "currency comparison", "travel tool", "finance"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/travel/travel-budget-matrix";
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Travel Budget Currency Comparison Matrix",
    url: toolUrl,
    description: "Compare travel budgets across multiple destination currencies.",
    applicationCategory: "TravelApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Travel Tools", item: siteURL + "/tools#cat-travel" },
      { "@type": "ListItem", position: 3, name: "Budget Matrix", item: toolUrl }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <TravelBudgetMatrixClient />
    
      <RelatedTools currentToolUrl="/tools/travel/travel-budget-matrix" />
</div>
  );
}
