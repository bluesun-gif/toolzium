import JsonLd from "@/components/seo/json-ld";
import { PriorityMatrixClient } from "@/components/tools/productivity/priority-matrix-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Priority Matrix | Toolzium",
  description: "Organize tasks by impact and effort using an Eisenhower-style priority matrix.",
  path: "/tools/productivity/priority-matrix",
  keywords: ["priority matrix", "eisenhower matrix", "impact effort matrix", "task prioritization"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/priority-matrix`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Priority Matrix", url: toolUrl, description: "Organize tasks by impact and effort using an Eisenhower-style priority matrix.", applicationCategory: "ProductivityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` }, { "@type": "ListItem", position: 3, name: "Priority Matrix", item: toolUrl }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <PriorityMatrixClient />
    
      <RelatedTools currentToolUrl="/tools/productivity/priority-matrix" />
</div>
  );
}
