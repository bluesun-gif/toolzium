import JsonLd from "@/components/seo/json-ld";
import { MeetingAgendaClient } from "@/components/tools/productivity/meeting-agenda-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Meeting Agenda Builder | Toolzium",
  description: "Create and structure meeting agendas. Keep track of topics, presenters, and time allocations to run effective meetings.",
  path: "/tools/productivity/meeting-agenda",
  keywords: ["meeting agenda", "agenda builder", "meeting planner", "time management"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/productivity/meeting-agenda`;
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "Meeting Agenda Builder", 
    url: toolUrl, 
    description: "Build structured meeting agendas with time allocations.", 
    applicationCategory: "ProductivityApplication", 
    operatingSystem: "All", 
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } 
  };
  const crumbsLd = { 
    "@context": "https://schema.org", 
    "@type": "BreadcrumbList", 
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL }, 
      { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${siteURL}/tools#cat-productivity` }, 
      { "@type": "ListItem", position: 3, name: "Meeting Agenda", item: toolUrl }
    ] 
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <MeetingAgendaClient />
    
      <RelatedTools currentToolUrl="/tools/productivity/meeting-agenda" />
</div>
  );
}
