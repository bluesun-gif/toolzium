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
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <EmergencyLoanClient />
    
      <RelatedTools currentToolUrl="/tools/finance/emergency-loan" />
</div>
  );
}
