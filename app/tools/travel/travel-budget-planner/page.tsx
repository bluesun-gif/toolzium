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
  

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Travel Multi-Currency Budget Planner work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Travel Multi-Currency Budget Planner runs instantly in your browser. Multi-country travel budget planner. Select up to 4 destination countries & currencies, daily allowances, flight/hotel breakdown. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Travel Multi-Currency Budget Planner 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Travel Multi-Currency Budget Planner is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Travel Multi-Currency Budget Planner?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <TravelBudgetPlannerClient />
    </div>
  );
}
