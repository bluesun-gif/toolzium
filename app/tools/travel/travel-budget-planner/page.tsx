import JsonLd from "@/components/seo/json-ld";
import { TravelBudgetPlannerClient } from "@/components/tools/travel/travel-budget-planner-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Travel Multi-Currency Budget Planner | Toolzium",
  description: "Plan multi-country travel budgets and convert everything back to your base currency.",
  path: "/tools/travel/travel-budget-planner",
  keywords: ["travel budget planner", "multi currency trip calculator", "vacation budget", "trip expenses"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/travel/travel-budget-planner";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Travel Multi-Currency Budget Planner", url: toolUrl, description: "Plan multi-country travel budgets.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: siteURL + "/tools#cat-travel" }, { "@type": "ListItem", position: 3, name: "Travel Budget Planner", item: toolUrl }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <TravelBudgetPlannerClient />
    </div>
  );
}
