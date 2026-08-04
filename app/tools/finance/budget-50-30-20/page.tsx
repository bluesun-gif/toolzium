import JsonLd from "@/components/seo/json-ld";
import { Budget503020Client } from "@/components/tools/finance/budget-50-30-20-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "50/30/20 Rule Budget Calculator | Toolzium",
  description: "Calculate your budget using the 50/30/20 rule to split income between needs, wants, and savings.",
  path: "/tools/finance/budget-50-30-20",
  keywords: ["50 30 20 budget", "budget calculator", "income allocation", "personal finance tool"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/budget-50-30-20";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "50/30/20 Rule Budget Calculator", url: toolUrl, description: "Budget calculator following the 50/30/20 rule.", applicationCategory: "FinanceApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: siteURL + "/tools#cat-finance" }, { "@type": "ListItem", position: 3, name: "50/30/20 Budget Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is the 50/30/20 rule?", acceptedAnswer: { "@type": "Answer", text: "The 50/30/20 rule is a simple budgeting method where 50% of your after-tax income goes to Needs, 30% to Wants, and 20% to Savings or Debt." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><Budget503020Client /></div>);
}
