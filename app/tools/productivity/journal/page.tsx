import JsonLd from "@/components/seo/json-ld";
import { JournalClient } from "@/components/tools/productivity/journal-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Daily Journal | Toolzium",
  description: "Simple daily journal with mood tracking and date navigation.",
  path: "/tools/productivity/journal",
  keywords: ["journal", "diary", "mood tracker", "productivity"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/journal`;
  
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "Daily Journal", 
    url: toolUrl, 
    description: "Simple daily journal with mood tracking.", 
    applicationCategory: "UtilitiesApplication", 
    operatingSystem: "All", 
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } 
  };
  
  const crumbsLd = { 
    "@context": "https://schema.org", 
    "@type": "BreadcrumbList", 
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL }, 
      { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` }, 
      { "@type": "ListItem", position: 3, name: "Daily Journal", item: toolUrl }
    ] 
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JournalClient />
    
      <RelatedTools currentToolUrl="/tools/productivity/journal" />
</div>
  );
}
