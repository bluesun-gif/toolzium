import JsonLd from "@/components/seo/json-ld";
import { OkrPlannerClient } from "@/components/tools/productivity/okr-planner-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "OKR (Objectives & Key Results) Planner | Toolzium",
  description: "Set and track your goals with this structured OKR planning tool. Monitor progress for objectives and key results.",
  path: "/tools/productivity/okr-planner",
  keywords: ["okr", "planner", "goals", "productivity", "tracker", "objectives", "key results"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/productivity/okr-planner";
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "OKR Planner", 
    url: toolUrl, 
    description: "Track your Objectives and Key Results.", 
    applicationCategory: "BusinessApplication", 
    operatingSystem: "All", 
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } 
  };
  const crumbsLd = { 
    "@context": "https://schema.org", 
    "@type": "BreadcrumbList", 
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL }, 
      { "@type": "ListItem", position: 2, name: "Productivity Tools", item: siteURL + "/tools#cat-productivity" }, 
      { "@type": "ListItem", position: 3, name: "OKR Planner", item: toolUrl }
    ] 
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <OkrPlannerClient />
    
      <RelatedTools currentToolUrl="/tools/productivity/okr-planner" />
</div>
  );
}
