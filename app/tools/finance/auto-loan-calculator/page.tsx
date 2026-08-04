import JsonLd from "@/components/seo/json-ld";
import { AutoLoanCalculatorClient } from "@/components/tools/finance/auto-loan-calculator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Auto Loan Monthly Payment & Amortization Calculator | Toolzium",
  description: "Calculate auto loan monthly payments, total interest, sales tax, and trade-in value deductions.",
  path: "/tools/finance/auto-loan-calculator",
  keywords: ["auto loan", "car loan", "calculator", "finance", "amortization", "monthly payment"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/auto-loan-calculator";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Auto Loan Calculator", url: toolUrl, description: "Calculate auto loan monthly payments, total interest, sales tax, and trade-in value deductions.", applicationCategory: "FinanceApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: siteURL + "/tools#cat-finance" }, { "@type": "ListItem", position: 3, name: "Auto Loan Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How is an auto loan payment calculated?", acceptedAnswer: { "@type": "Answer", text: "It uses the standard amortization formula based on the financed amount, term length, and interest rate." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><AutoLoanCalculatorClient /></div>);
}
