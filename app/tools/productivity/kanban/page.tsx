import JsonLd from "@/components/seo/json-ld";
import { KanbanClient } from "@/components/tools/productivity/kanban-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Kanban Board | Toolzium",
  description: "A simple, customizable kanban board to organize your tasks and boost productivity.",
  path: "/tools/productivity/kanban",
  keywords: ["kanban", "task management", "productivity", "board", "todo list", "agile"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/kanban`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Kanban Board",
    url: toolUrl,
    description: "Organize tasks visually with a customizable Kanban board.",
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
      { "@type": "ListItem", position: 3, name: "Kanban Board", item: toolUrl }
    ]
  };
  
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Does this save my tasks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, your tasks and columns are automatically saved to your browser's local storage so they are available when you return."
        }
      },
      {
        "@type": "Question",
        name: "Can I add custom columns?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can add new columns and organize tasks across as many columns as you need."
        }
      }
    ]
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <KanbanClient />
    
      <RelatedTools currentToolUrl="/tools/productivity/kanban" />
</div>
  );
}
