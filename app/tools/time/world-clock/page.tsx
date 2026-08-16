import JsonLd from "@/components/seo/json-ld";
import { WorldClockClient } from "@/components/tools/time/world-clock-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "World Clock | Toolzium",
  description: "Display current time in multiple timezones simultaneously. Live updating world clock.",
  path: "/tools/time/world-clock",
  keywords: ["world clock", "timezone converter", "current time", "time zones"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/time/world-clock`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "World Clock", url: toolUrl, description: "Display current time in multiple timezones simultaneously.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Date & Time Tools", item: `${siteURL}/tools#cat-time` }, { "@type": "ListItem", position: 3, name: "World Clock", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is a world clock?", acceptedAnswer: { "@type": "Answer", text: "A world clock displays the current time in different cities and timezones across the globe." } }, { "@type": "Question", name: "How many cities can I add?", acceptedAnswer: { "@type": "Answer", text: "You can add as many cities as you need from our list of major world cities." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <WorldClockClient />
    
      <RelatedTools currentToolUrl="/tools/time/world-clock" />
</div>
  );
}
