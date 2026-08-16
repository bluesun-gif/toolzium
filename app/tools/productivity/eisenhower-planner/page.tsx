import JsonLd from "@/components/seo/json-ld";
import { EisenhowerPlannerClient } from "@/components/tools/productivity/eisenhower-planner-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Eisenhower Matrix Planner | Toolzium",
  description: "Organize your tasks by urgency and importance with the Eisenhower Matrix planner.",
  path: "/tools/productivity/eisenhower-planner",
  keywords: ["eisenhower matrix", "productivity planner", "task management", "time management", "prioritization"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/productivity/eisenhower-planner";
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Eisenhower Matrix Planner",
    url: toolUrl,
    description: "Organize tasks using the Eisenhower Matrix.",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Productivity Tools", item: siteURL + "/tools#cat-productivity" },
      { "@type": "ListItem", position: 3, name: "Eisenhower Matrix Planner", item: toolUrl }
    ]
  };
  
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What is the Eisenhower Matrix?", acceptedAnswer: { "@type": "Answer", text: "A time management framework that helps prioritize tasks by urgency and importance." } }
    ]
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <EisenhowerPlannerClient />
    
      <RelatedTools currentToolUrl="/tools/productivity/eisenhower-planner" />
</div>
  );
}
