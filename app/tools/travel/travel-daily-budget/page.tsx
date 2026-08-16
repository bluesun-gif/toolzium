import JsonLd from "@/components/seo/json-ld";
import { TravelBudgetClient } from "@/components/tools/travel/travel-daily-budget-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Travel Daily Expense Budget Calculator | Toolzium",
  description: "Calculate daily travel expense budgets for domestic or international trips.",
  path: "/tools/travel/travel-daily-budget",
  keywords: ["travel budget", "daily expense calculator", "trip budget", "vacation budget"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/travel/travel-daily-budget";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Travel Daily Expense Budget Calculator",
    url: toolUrl,
    description: "Calculate daily travel expense budgets for domestic or international trips.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Travel Tools", item: siteURL + "/tools#cat-travel" },
      { "@type": "ListItem", position: 3, name: "Travel Budget Calculator", item: toolUrl },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How should I budget for travel?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A good starting point is dividing your total budget across accommodation, food, transport, activities, and an emergency buffer.",
        },
      },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <TravelBudgetClient />
    
      <RelatedTools currentToolUrl="/tools/travel/travel-daily-budget" />
</div>
  );
}
