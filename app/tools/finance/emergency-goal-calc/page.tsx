import JsonLd from "@/components/seo/json-ld";
import { EmergencyGoalCalcClient } from "@/components/tools/finance/emergency-goal-calc-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Emergency Savings Goal Calculator | Toolzium",
  description: "Calculate how much you need to save to reach your emergency savings goal. Track interest and milestones.",
  path: "/tools/finance/emergency-goal-calc",
  keywords: ["emergency fund", "savings calculator", "finance tool", "goal planner"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/emergency-goal-calc";
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Emergency Savings Goal Calculator",
    url: toolUrl,
    description: "Calculate how much you need to save to reach your emergency savings goal. Track interest and milestones.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Finance Tools", item: siteURL + "/tools#cat-finance" },
      { "@type": "ListItem", position: 3, name: "Emergency Savings Goal Calculator", item: toolUrl }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <EmergencyGoalCalcClient />
    </div>
  );
}
