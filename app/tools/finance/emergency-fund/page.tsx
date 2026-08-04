import JsonLd from "@/components/seo/json-ld";
import { EmergencyFundClient } from "@/components/tools/finance/emergency-fund-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Emergency Fund Calculator | Toolzium",
  description: "Calculate required safety net and emergency fund goals based on monthly expenses.",
  path: "/tools/finance/emergency-fund",
  keywords: ["emergency fund calculator", "savings goal", "safety net", "finance tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/emergency-fund";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Emergency Fund Calculator", url: toolUrl, description: "Calculate your emergency fund goal.", applicationCategory: "FinanceApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: siteURL + "/tools#cat-finance" }, { "@type": "ListItem", position: 3, name: "Emergency Fund", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What does this tool do?", acceptedAnswer: { "@type": "Answer", text: "It calculates how much you need for an emergency fund." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <EmergencyFundClient />
    </div>
  );
}
