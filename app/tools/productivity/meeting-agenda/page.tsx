import JsonLd from "@/components/seo/json-ld";
import { MeetingAgendaClient } from "@/components/tools/productivity/meeting-agenda-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

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
  

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Meeting Agenda Builder work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Meeting Agenda Builder runs instantly in your browser. Build structured meeting agendas. Topics with presenters and time allocation. Auto-calculate totals. Templates included. Copy formatted. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Meeting Agenda Builder 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Meeting Agenda Builder is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Meeting Agenda Builder?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <MeetingAgendaClient />
    </div>
  );
}
