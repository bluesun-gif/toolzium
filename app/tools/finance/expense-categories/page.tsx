import JsonLd from "@/components/seo/json-ld";
import { ExpenseCategoriesClient } from "@/components/tools/finance/expense-categories-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Expense Categorizer | Toolzium",
  description: "Categorize and analyze expenses by category with charts and budget limits.",
  path: "/tools/finance/expense-categories",
  keywords: ["expense tracker", "budget planner", "finance tool", "spending analysis"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/finance/expense-categories`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Expense Categorizer", url: toolUrl, description: "Categorize and analyze expenses by category with charts and budget limits.", applicationCategory: "FinanceApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: `${siteURL}/tools#cat-finance` }, { "@type": "ListItem", position: 3, name: "Expense Categorizer", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What categories can I track?", acceptedAnswer: { "@type": "Answer", text: "You can track Housing, Food, Transport, Entertainment, Shopping, Bills, Health, Education, and Other." } }, { "@type": "Question", name: "Can I set budget limits?", acceptedAnswer: { "@type": "Answer", text: "Yes, you can set budget limits per category and see progress bars and over-budget alerts." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><ExpenseCategoriesClient /></div>);
}
