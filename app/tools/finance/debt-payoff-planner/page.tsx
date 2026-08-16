import JsonLd from "@/components/seo/json-ld";
import { DebtPayoffPlannerClient } from "@/components/tools/finance/debt-payoff-planner-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Debt Snowball vs Avalanche Calculator | Toolzium",
  description: "Compare Debt Snowball and Avalanche payoff strategies. Calculate debt-free dates and total interest paid.",
  path: "/tools/finance/debt-payoff-planner",
  keywords: ["debt snowball calculator", "debt avalanche calculator", "debt payoff planner", "finance tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/debt-payoff-planner";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Debt Payoff Planner", url: toolUrl, description: "Compare Debt Snowball vs Avalanche strategies.", applicationCategory: "FinanceApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: siteURL + "/tools#cat-finance" }, { "@type": "ListItem", position: 3, name: "Debt Payoff Planner", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is the difference between snowball and avalanche?", acceptedAnswer: { "@type": "Answer", text: "Snowball pays off the smallest balance first for psychological wins. Avalanche pays off the highest interest rate first to save money mathematically." } }] };
  
  return (
    <div className={"space-y-4"}>
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <DebtPayoffPlannerClient />
    
      <RelatedTools currentToolUrl="/tools/finance/debt-payoff-planner" />
</div>
  );
}
