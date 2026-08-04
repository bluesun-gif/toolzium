import JsonLd from "@/components/seo/json-ld";
import { CreditPayoffClient } from "@/components/tools/finance/credit-payoff-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Credit Card Payoff Calculator | Toolzium",
  description: "Calculate time and interest required to pay off credit card debt.",
  path: "/tools/finance/credit-payoff",
  keywords: ["credit card payoff", "debt calculator", "interest calculator", "finance tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/credit-payoff";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Credit Card Payoff Calculator", url: toolUrl, description: "Calculate time and interest required to pay off credit card debt.", applicationCategory: "FinanceApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: siteURL + "/tools#cat-finance" }, { "@type": "ListItem", position: 3, name: "Credit Card Payoff Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How is credit card interest calculated?", acceptedAnswer: { "@type": "Answer", text: "Interest is typically calculated daily based on your APR and outstanding balance." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><CreditPayoffClient /></div>);
}
