import JsonLd from "@/components/seo/json-ld";
import { EmergencyLoanClient } from "@/components/tools/finance/emergency-loan-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Emergency Loan vs Savings Comparison | Toolzium",
  description: "Compare the financial impact of using emergency savings versus taking a loan.",
  path: "/tools/finance/emergency-loan",
  keywords: ["emergency", "loan", "savings", "finance", "comparison"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/emergency-loan";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Emergency Loan vs Savings Comparison", url: toolUrl, description: "Compare the financial impact of using emergency savings versus taking a loan.", applicationCategory: "FinanceApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: siteURL + "/tools#cat-finance" }, { "@type": "ListItem", position: 3, name: "Emergency Loan vs Savings Comparison", item: toolUrl }] };
  

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Emergency Loan vs Savings Comparison work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Emergency Loan vs Savings Comparison runs instantly in your browser. Compare financial impact of using emergency savings vs taking a personal loan or credit card advance. Total interest paid vs interest lost. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Emergency Loan vs Savings Comparison 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Emergency Loan vs Savings Comparison is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Emergency Loan vs Savings Comparison?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <EmergencyLoanClient />
    
      <RelatedTools currentToolUrl="/tools/finance/emergency-loan" />
</div>
  );
}
