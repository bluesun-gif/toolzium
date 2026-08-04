import JsonLd from "@/components/seo/json-ld";
import { LoanAmortizationClient } from "@/components/tools/finance/loan-amortization-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Loan Amortization Schedule Calculator | Toolzium",
  description: "Calculate detailed loan repayment amortization schedule including monthly payment, total interest, and principal breakdown.",
  path: "/tools/finance/loan-amortization",
  keywords: ["loan amortization", "loan calculator", "amortization schedule", "interest calculator", "finance tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/loan-amortization";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Loan Amortization Calculator", url: toolUrl, description: "Calculate detailed loan repayment amortization schedule.", applicationCategory: "FinanceApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: siteURL + "/tools#cat-finance" }, { "@type": "ListItem", position: 3, name: "Loan Amortization", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is an amortization schedule?", acceptedAnswer: { "@type": "Answer", text: "A complete table of periodic loan payments, showing the amount of principal and the amount of interest that comprise each payment until the loan is paid off at the end of its term." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><LoanAmortizationClient /></div>);
}
