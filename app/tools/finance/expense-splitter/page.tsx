import JsonLd from "@/components/seo/json-ld";
import { ExpenseSplitterClient } from "@/components/tools/finance/expense-splitter-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Expense Splitter | Toolzium",
  description: "Split expenses among a group and calculate who owes whom.",
  path: "/tools/finance/expense-splitter",
  keywords: ["expense splitter", "split bills", "finance tool", "who owes whom"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/finance/expense-splitter`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Expense Splitter", url: toolUrl, description: "Split expenses among a group and calculate who owes whom.", applicationCategory: "FinanceApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: `${siteURL}/tools#cat-finance` }, { "@type": "ListItem", position: 3, name: "Expense Splitter", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How does the expense splitter work?", acceptedAnswer: { "@type": "Answer", text: "Add people and their expenses, and the tool will calculate the most efficient way to settle debts." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <ExpenseSplitterClient />
    
      <RelatedTools currentToolUrl="/tools/finance/expense-splitter" />
</div>
  );
}
