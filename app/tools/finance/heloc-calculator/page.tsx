import JsonLd from "@/components/seo/json-ld";
import { HelocCalculatorClient } from "@/components/tools/finance/heloc-calculator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HELOC Payment Calculator | Toolzium",
  description: "Calculate interest-only draw period and principal + interest repayment period monthly payments for HELOC.",
  path: "/tools/finance/heloc-calculator",
  keywords: ["heloc", "calculator", "finance", "loan"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/heloc-calculator";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "HELOC Payment Calculator", url: toolUrl, description: "Calculate interest-only draw period and principal + interest repayment period monthly payments for HELOC.", applicationCategory: "FinanceApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: siteURL + "/tools#cat-finance" }, { "@type": "ListItem", position: 3, name: "HELOC Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is HELOC?", acceptedAnswer: { "@type": "Answer", text: "Home Equity Line of Credit." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><HelocCalculatorClient /></div>);
}
