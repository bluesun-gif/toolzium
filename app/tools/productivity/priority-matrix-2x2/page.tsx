import JsonLd from "@/components/seo/json-ld";
import { PriorityMatrixClient } from "@/components/tools/productivity/priority-matrix-2x2-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Priority Matrix 2x2 Task Tracker | Toolzium",
  description: "Organize tasks using a 2x2 Impact vs Effort Matrix to prioritize your work efficiently.",
  path: "/tools/productivity/priority-matrix-2x2",
  keywords: ["priority matrix", "2x2 matrix", "eisenhower matrix", "task prioritization", "impact vs effort"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/priority-matrix-2x2`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Priority Matrix 2x2 Task Tracker",
    url: toolUrl,
    description: "Organize tasks using a 2x2 Impact vs Effort Matrix to prioritize your work efficiently.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` },
      { "@type": "ListItem", position: 3, name: "Priority Matrix", item: toolUrl }
    ]
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <PriorityMatrixClient />
    </div>
  );
}
