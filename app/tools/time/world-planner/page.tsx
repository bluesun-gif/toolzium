import JsonLd from "@/components/seo/json-ld";
import { WorldPlannerClient } from "@/components/tools/time/world-planner-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "World Clock & Meeting Planner | Toolzium",
  description: "Compare times across multiple world cities to find ideal meeting slots.",
  path: "/tools/time/world-planner",
  keywords: ["world clock", "meeting planner", "timezone converter"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/time/world-planner";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "World Clock & Meeting Planner", url: toolUrl, description: "Compare times across multiple world cities to find ideal meeting slots.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Time Tools", item: siteURL + "/tools#cat-time" }, { "@type": "ListItem", position: 3, name: "World Clock & Meeting Planner", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to find common meeting times?", acceptedAnswer: { "@type": "Answer", text: "Use this tool to compare working hours across different timezones to easily find common meeting slots." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <WorldPlannerClient />
    
      <RelatedTools currentToolUrl="/tools/time/world-planner" />
</div>
  );
}
