import JsonLd from "@/components/seo/json-ld";
import { TimelineClient } from "@/components/tools/productivity/timeline-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Project Timeline | Toolzium",
  description: "Visual project timeline and Gantt chart planner to manage your tasks.",
  path: "/tools/productivity/timeline",
  keywords: ["project timeline", "gantt chart", "task planner", "project management"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/timeline`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Project Timeline",
    url: toolUrl,
    description: "Visual project timeline and Gantt chart planner to manage your tasks.",
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
      { "@type": "ListItem", position: 3, name: "Project Timeline", item: toolUrl }
    ]
  };
  
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What is a project timeline?", acceptedAnswer: { "@type": "Answer", text: "A project timeline is a visual representation of tasks over time, often resembling a Gantt chart, helping you manage project schedules." } }
    ]
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <TimelineClient />
    </div>
  );
}
