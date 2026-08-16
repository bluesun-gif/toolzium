import JsonLd from "@/components/seo/json-ld";
import { LoanComparisonClient } from "@/components/tools/finance/loan-comparison-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Loan Comparison Calculator | Toolzium",
  description: "Compare multiple loan offers side by side to find the cheapest option.",
  path: "/tools/finance/loan-comparison",
  keywords: ["loan comparison", "loan calculator", "compare loans", "interest calculator"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/finance/loan-comparison`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Loan Comparison Calculator", url: toolUrl, description: "Compare multiple loan offers side by side to find the cheapest option.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: `${siteURL}/tools#cat-finance` }, { "@type": "ListItem", position: 3, name: "Loan Comparison Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How do I compare loans?", acceptedAnswer: { "@type": "Answer", text: "Enter the principal, interest rate, and term for up to three loans to see which one costs less over time." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><LoanComparisonClient />
      <RelatedTools currentToolUrl="/tools/finance/loan-comparison" />
</div>);
}
