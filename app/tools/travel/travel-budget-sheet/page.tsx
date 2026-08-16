import JsonLd from "@/components/seo/json-ld";
import { TravelBudgetSheetClient } from "@/components/tools/travel/travel-budget-sheet-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Travel Budget Multi-Currency Comparison Sheet | Toolzium",
  description: "Multi-currency travel expense comparison and trip budgeting sheet.",
  path: "/tools/travel/travel-budget-sheet",
  keywords: ["travel budget", "expense comparison", "multi-currency", "trip budget", "travel tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/travel/travel-budget-sheet";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Travel Budget Multi-Currency Comparison Sheet", url: toolUrl, description: "Multi-currency travel expense comparison and trip budgeting sheet.", applicationCategory: "UtilitiesApplication", operatingSystem: "All" };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: siteURL + "/tools#cat-travel" }, { "@type": "ListItem", position: 3, name: "Travel Budget Sheet", item: toolUrl }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><TravelBudgetSheetClient />
      <RelatedTools currentToolUrl="/tools/travel/travel-budget-sheet" />
</div>);
}
