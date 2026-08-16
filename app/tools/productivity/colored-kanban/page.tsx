import JsonLd from "@/components/seo/json-ld";
import { ColoredKanbanClient } from "@/components/tools/productivity/colored-kanban-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Color-Coded Category Kanban Board | Toolzium",
  description: "Visual Kanban task board with custom color tags & category badges.",
  path: "/tools/productivity/colored-kanban",
  keywords: ["kanban", "board", "task management", "productivity"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/productivity/colored-kanban";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Color-Coded Kanban Board", url: toolUrl, description: "Visual Kanban task board with custom color tags.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: siteURL + "/tools#cat-productivity" }, { "@type": "ListItem", position: 3, name: "Color-Coded Kanban Board", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to use?", acceptedAnswer: { "@type": "Answer", text: "Add tasks and move them between columns." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><ColoredKanbanClient />
      <RelatedTools currentToolUrl="/tools/productivity/colored-kanban" />
</div>);
}
