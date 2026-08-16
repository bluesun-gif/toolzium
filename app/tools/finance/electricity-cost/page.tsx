import JsonLd from "@/components/seo/json-ld";
import { ElectricityCostClient } from "@/components/tools/finance/electricity-cost-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Electricity Cost Calculator | Toolzium",
  description: "Calculate electricity cost for appliances. Estimate monthly and yearly electricity bills.",
  path: "/tools/finance/electricity-cost",
  keywords: ["electricity", "cost", "calculator", "appliance", "energy", "power bill"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/finance/electricity-cost`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Electricity Cost Calculator", url: toolUrl, description: "Calculate electricity cost for appliances.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: `${siteURL}/tools#cat-finance` }, { "@type": "ListItem", position: 3, name: "Electricity Cost Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How is electricity cost calculated?", acceptedAnswer: { "@type": "Answer", text: "Electricity cost is calculated by multiplying the appliance wattage by the hours used per day, dividing by 1000 to get kWh, and then multiplying by your local electricity rate per kWh." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><ElectricityCostClient />
      <RelatedTools currentToolUrl="/tools/finance/electricity-cost" />
</div>);
}
