import JsonLd from "@/components/seo/json-ld";
import { HydrationClient } from "@/components/tools/health/hydration-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Hydration Reminder | Toolzium",
  description: "Track daily water intake with visual progress.",
  path: "/tools/health/hydration",
  keywords: ["hydration tracker", "water reminder", "health", "wellness"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/health/hydration`;
  
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "Hydration Reminder", 
    url: toolUrl, 
    description: "Track daily water intake.", 
    applicationCategory: "HealthApplication", 
    operatingSystem: "All", 
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } 
  };
  
  const crumbsLd = { 
    "@context": "https://schema.org", 
    "@type": "BreadcrumbList", 
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL }, 
      { "@type": "ListItem", position: 2, name: "Health Tools", item: `${siteURL}/tools#cat-health` }, 
      { "@type": "ListItem", position: 3, name: "Hydration Reminder", item: toolUrl }
    ] 
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <HydrationClient />
    
      <RelatedTools currentToolUrl="/tools/health/hydration" />
</div>
  );
}
