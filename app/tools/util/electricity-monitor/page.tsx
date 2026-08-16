import JsonLd from "@/components/seo/json-ld";
import { ElectricityMonitorClient } from "@/components/tools/util/electricity-monitor-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Electricity Usage Monitor | Toolzium",
  description: "Track your home electricity consumption and estimate monthly costs. Add appliances and calculate total kWh usage.",
  path: "/tools/util/electricity-monitor",
  keywords: ["electricity monitor", "power consumption calculator", "appliance wattage tracker", "kWh calculator", "energy cost estimator"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/util/electricity-monitor`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Electricity Usage Monitor",
    url: toolUrl,
    description: "Track your home electricity consumption and estimate monthly costs.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Utility Tools", item: `${siteURL}/tools#cat-util` },
      { "@type": "ListItem", position: 3, name: "Electricity Usage Monitor", item: toolUrl }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <ElectricityMonitorClient />
    
      <RelatedTools currentToolUrl="/tools/util/electricity-monitor" />
</div>
  );
}
