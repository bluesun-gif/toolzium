import JsonLd from "@/components/seo/json-ld";
import { EmergencyFundPlannerClient } from "@/components/tools/finance/emergency-fund-planner-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Emergency Fund Savings & Target Planner | Toolzium",
  description: "Calculate your recommended safety net emergency fund size and monthly savings target timeline based on essential expenses.",
  path: "/tools/finance/emergency-fund-planner",
  keywords: ["emergency fund calculator", "savings planner", "financial safety net", "savings target calculator", "finance tool"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/finance/emergency-fund-planner";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Emergency Fund Planner", url: toolUrl, description: "Calculate your recommended safety net emergency fund size and monthly savings target timeline.", applicationCategory: "FinanceApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: siteURL + "/tools#cat-finance" }, { "@type": "ListItem", position: 3, name: "Emergency Fund Planner", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How much emergency fund do I need?", acceptedAnswer: { "@type": "Answer", text: "Experts typically recommend saving 3 to 6 months of essential living expenses for your emergency fund." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><EmergencyFundPlannerClient />
      <RelatedTools currentToolUrl="/tools/finance/emergency-fund-planner" />
</div>);
}
