import JsonLd from "@/components/seo/json-ld";
import { FlightTimeClient } from "@/components/tools/travel/flight-time-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Flight Time Calculator | Toolzium",
  description: "Estimate flight duration and distances between major global cities.",
  path: "/tools/travel/flight-time",
  keywords: ["flight time", "flight duration", "flight calculator", "distance between cities", "air travel time"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/travel/flight-time`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Flight Time Calculator", url: toolUrl, description: "Calculate flight duration between cities.", applicationCategory: "TravelApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: `${siteURL}/tools#cat-travel` }, { "@type": "ListItem", position: 3, name: "Flight Time Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How is flight time estimated?", acceptedAnswer: { "@type": "Answer", text: "It is based on the great-circle distance between cities and an average commercial plane speed of 900 km/h, adding a flat 30 minutes for takeoff and landing." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><FlightTimeClient />
      <RelatedTools currentToolUrl="/tools/travel/flight-time" />
</div>);
}
