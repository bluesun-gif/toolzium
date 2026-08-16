import JsonLd from "@/components/seo/json-ld";
import { PriorityKanbanClient } from "@/components/tools/productivity/priority-kanban-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Priority Kanban Board | Toolzium",
  description: "Organize tasks by priority with this simple kanban board.",
  path: "/tools/productivity/priority-kanban",
  keywords: ["kanban", "board", "priority", "productivity", "tasks"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/productivity/priority-kanban";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Priority Kanban Board", url: toolUrl, description: "Organize tasks by priority with this simple kanban board.", applicationCategory: "ProductivityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: siteURL + "/tools#cat-productivity" }, { "@type": "ListItem", position: 3, name: "Priority Kanban Board", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is Priority Kanban Board?", acceptedAnswer: { "@type": "Answer", text: "It is a kanban board to organize tasks by priority." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><PriorityKanbanClient />
      <RelatedTools currentToolUrl="/tools/productivity/priority-kanban" />
</div>);
}
