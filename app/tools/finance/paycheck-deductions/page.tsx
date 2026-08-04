import JsonLd from "@/components/seo/json-ld";
import { PaycheckDeductionsClient } from "@/components/tools/finance/paycheck-deductions-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Paycheck Deductions & Take-Home Calculator | Toolzium",
  description: "Calculate your net paycheck take-home pay after itemized taxes and voluntary deductions.",
  path: "/tools/finance/paycheck-deductions",
  keywords: ["paycheck calculator", "take home pay calculator", "salary calculator", "net pay calculator", "finance tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/paycheck-deductions";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Paycheck Deductions Calculator", url: toolUrl, description: "Calculate your net paycheck take-home pay.", applicationCategory: "FinanceApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: siteURL + "/tools#cat-finance" }, { "@type": "ListItem", position: 3, name: "Paycheck Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How is net pay calculated?", acceptedAnswer: { "@type": "Answer", text: "Net pay is calculated by taking your gross pay and subtracting pre-tax deductions, then subtracting taxes (Federal, State, FICA), and finally subtracting post-tax deductions." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <PaycheckDeductionsClient />
    </div>
  );
}
