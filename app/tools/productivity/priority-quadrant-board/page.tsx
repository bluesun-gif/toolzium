import JsonLd from "@/components/seo/json-ld";
import { PriorityQuadrantBoardClient } from "@/components/tools/productivity/priority-quadrant-board-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Priority Quadrant Action Board | Toolzium",
  description: "Interactive 4-quadrant task board with priority sorting.",
  path: "/tools/productivity/priority-quadrant-board",
  keywords: ["productivity", "quadrant", "eisenhower", "matrix", "tasks"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/priority-quadrant-board`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Priority Quadrant Action Board", url: toolUrl, description: "Interactive 4-quadrant task board with priority sorting.", applicationCategory: "ProductivityApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` }, { "@type": "ListItem", position: 3, name: "Priority Quadrant Action Board", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is a Priority Quadrant Action Board?", acceptedAnswer: { "@type": "Answer", text: "It is a task management tool based on the Eisenhower matrix, helping you prioritize tasks by urgency and importance." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <PriorityQuadrantBoardClient />
    </div>
  );
}
