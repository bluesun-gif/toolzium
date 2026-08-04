import JsonLd from "@/components/seo/json-ld";
import { EisenhowerKanbanClient } from "@/components/tools/productivity/eisenhower-kanban-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Eisenhower Kanban Board | Toolzium",
  description: "Manage your tasks using a hybrid Kanban board organized by the Eisenhower matrix (Urgent vs Important).",
  path: "/tools/productivity/eisenhower-kanban",
  keywords: ["eisenhower matrix", "kanban board", "task management", "productivity", "prioritization"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/productivity/eisenhower-kanban";
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Eisenhower Kanban Board",
    url: toolUrl,
    description: "Manage your tasks using a hybrid Kanban board organized by the Eisenhower matrix.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Productivity Tools", item: siteURL + "/tools#cat-productivity" },
      { "@type": "ListItem", position: 3, name: "Eisenhower Kanban Board", item: toolUrl }
    ]
  };
  
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are the 4 quadrants of the Eisenhower Matrix?",
        acceptedAnswer: { "@type": "Answer", text: "Do First (Urgent & Important), Schedule (Not Urgent & Important), Delegate (Urgent & Not Important), and Eliminate (Not Urgent & Not Important)." }
      }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <EisenhowerKanbanClient />
    </div>
  );
}
