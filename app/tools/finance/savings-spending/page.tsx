import JsonLd from "@/components/seo/json-ld";
import { SavingsSpendingClient } from "@/components/tools/finance/savings-spending-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Savings vs Spending Analyzer | Toolzium",
  description: "Compare saving vs spending habits.",
  path: "/tools/finance/savings-spending",
  keywords: ["savings", "spending", "finance", "budget", "analyzer"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/savings-spending";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Savings vs Spending Analyzer", url: toolUrl, description: "Compare saving vs spending habits.", applicationCategory: "FinanceApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: siteURL + "/tools#cat-finance" }, { "@type": "ListItem", position: 3, name: "Savings vs Spending Analyzer", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is this tool?", acceptedAnswer: { "@type": "Answer", text: "It analyzes your spending and saving habits." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><SavingsSpendingClient />
      <RelatedTools currentToolUrl="/tools/finance/savings-spending" />
</div>);
}
