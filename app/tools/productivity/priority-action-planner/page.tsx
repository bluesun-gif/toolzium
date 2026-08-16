import JsonLd from "@/components/seo/json-ld";
import { PriorityActionPlannerClient } from "@/components/tools/productivity/priority-action-planner-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Priority Matrix Action Planner | Toolzium",
  description: "Eisenhower Priority Matrix action planner for daily workflows. Organize tasks by urgency and importance.",
  path: "/tools/productivity/priority-action-planner",
  keywords: ["eisenhower matrix", "priority planner", "task manager", "productivity"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/priority-action-planner`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Priority Matrix Action Planner", url: toolUrl, description: "Eisenhower Priority Matrix action planner for daily workflows.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` }, { "@type": "ListItem", position: 3, name: "Priority Matrix Action Planner", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is an Eisenhower Matrix?", acceptedAnswer: { "@type": "Answer", text: "It is a time management framework that helps you prioritize tasks by urgency and importance." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><PriorityActionPlannerClient />
      <RelatedTools currentToolUrl="/tools/productivity/priority-action-planner" />
</div>);
}
