import JsonLd from "@/components/seo/json-ld";
import { EisenhowerListClient } from "@/components/tools/productivity/eisenhower-list-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Eisenhower Matrix Planner | Toolzium",
  description: "Organize tasks using the 4-quadrant Eisenhower method.",
  path: "/tools/productivity/eisenhower-list",
  keywords: ["eisenhower matrix", "productivity", "to-do list", "priority planner"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/productivity/eisenhower-list";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Eisenhower Matrix Planner", url: toolUrl, description: "Organize tasks using the 4-quadrant Eisenhower method.", applicationCategory: "ProductivityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: siteURL + "/tools#cat-productivity" }, { "@type": "ListItem", position: 3, name: "Eisenhower Matrix Planner", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <EisenhowerListClient />
    
      <RelatedTools currentToolUrl="/tools/productivity/eisenhower-list" />
</div>
  );
}
