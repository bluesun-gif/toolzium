import JsonLd from "@/components/seo/json-ld";
import { FlightDurationClient } from "@/components/tools/travel/flight-duration-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Flight Duration & Time Difference Calculator | Toolzium",
  description: "Calculate actual flight duration accounting for time zone shifts.",
  path: "/tools/travel/flight-duration",
  keywords: ["flight duration", "time zone", "jet lag", "travel calculator"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/travel/flight-duration";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Flight Duration & Time Difference Calculator", url: toolUrl, description: "Calculate actual flight duration accounting for time zone shifts.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: siteURL + "/tools#cat-travel" }, { "@type": "ListItem", position: 3, name: "Flight Duration Calculator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to use this?", acceptedAnswer: { "@type": "Answer", text: "Enter departure and arrival times and time zones." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><FlightDurationClient /></div>);
}
