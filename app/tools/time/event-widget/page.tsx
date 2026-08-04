import JsonLd from "@/components/seo/json-ld";
import { EventWidgetClient } from "@/components/tools/time/event-widget-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Event Countdown Widget Creator | Toolzium",
  description: "Create customizable event countdown widgets and embed them anywhere.",
  path: "/tools/time/event-widget",
  keywords: ["countdown widget", "event countdown", "embed countdown", "time tracking", "custom widget"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/time/event-widget";
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "Event Countdown Widget Creator", 
    url: toolUrl, 
    description: "Create customizable event countdown widgets and embed them anywhere.", 
    applicationCategory: "UtilitiesApplication", 
    operatingSystem: "All", 
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } 
  };
  const crumbsLd = { 
    "@context": "https://schema.org", 
    "@type": "BreadcrumbList", 
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL }, 
      { "@type": "ListItem", position: 2, name: "Time Tools", item: siteURL + "/tools#cat-time" }, 
      { "@type": "ListItem", position: 3, name: "Event Countdown Widget Creator", item: toolUrl }
    ] 
  };
  const faqLd = { 
    "@context": "https://schema.org", 
    "@type": "FAQPage", 
    mainEntity: [
      { "@type": "Question", name: "Can I embed the countdown?", acceptedAnswer: { "@type": "Answer", text: "Yes, you can generate an iframe code snippet to embed the countdown on your website." } },
      { "@type": "Question", name: "How is the time calculated?", acceptedAnswer: { "@type": "Answer", text: "The countdown calculates the time remaining between your local time and the target date/time provided." } }
    ] 
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <EventWidgetClient />
    </div>
  );
}
