import JsonLd from "@/components/seo/json-ld";
import { BudgetTemplateClient } from "@/components/tools/finance/budget-template-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Budget Template Generator | Toolzium",
  description: "Generate monthly budget templates based on income and popular budgeting rules like 50/30/20.",
  path: "/tools/finance/budget-template",
  keywords: ["budget", "finance", "generator", "50/30/20 rule", "zero-based budget", "envelope method", "monthly budget"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/finance/budget-template`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Budget Template Generator", url: toolUrl, description: "Generate monthly budget templates based on income.", applicationCategory: "FinanceApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: `${siteURL}/tools#cat-finance` }, { "@type": "ListItem", position: 3, name: "Budget Template Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is the 50/30/20 rule?", acceptedAnswer: { "@type": "Answer", text: "It allocates 50% of income to needs, 30% to wants, and 20% to savings." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><BudgetTemplateClient /></div>);
}
