import JsonLd from "@/components/seo/json-ld";
import { TravelChecklistClient } from "@/components/tools/travel/checklist-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Travel Checklist | Toolzium",
  description: "Pre-trip checklist generator. Auto-generate categorized checklist.",
  path: "/tools/travel/checklist",
  keywords: ["travel", "checklist", "packing", "trip"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/travel/checklist`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Travel Checklist", url: toolUrl, description: "Travel packing checklist generator.", applicationCategory: "TravelApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Travel Tools", item: `${siteURL}/tools#cat-travel` }, { "@type": "ListItem", position: 3, name: "Travel Checklist", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to use this?", acceptedAnswer: { "@type": "Answer", text: "Select your trip type and check off items." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <TravelChecklistClient />
    </div>
  );
}
