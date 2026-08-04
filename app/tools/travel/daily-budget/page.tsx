import JsonLd from "@/components/seo/json-ld";
import { DailyBudgetClient } from "@/components/tools/travel/daily-budget-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Daily Travel Budget Planner | Toolzium",
  description: "Plan and track daily vacation spending across multiple categories.",
  path: "/tools/travel/daily-budget",
  keywords: ["travel budget", "budget planner", "vacation spending", "expense tracker"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/travel/daily-budget";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Daily Travel Budget Planner", url: toolUrl, description: "Plan and track daily vacation spending across multiple categories.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: siteURL + "/tools#cat-travel" }, { "@type": "ListItem", position: 3, name: "Daily Travel Budget Planner", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to plan a travel budget?", acceptedAnswer: { "@type": "Answer", text: "Use this tool to allocate your total trip budget into categories and track your daily spending." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <DailyBudgetClient />
    </div>
  );
}
