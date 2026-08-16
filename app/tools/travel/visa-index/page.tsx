import JsonLd from "@/components/seo/json-ld";
import { VisaIndexClient } from "@/components/tools/travel/visa-index-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Travel Visa Requirements Index | Toolzium",
  description: "Check visa requirements and travel restrictions based on your passport.",
  path: "/tools/travel/visa-index",
  keywords: ["visa requirements", "passport power", "travel visa", "evisa", "visa free travel"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/travel/visa-index";
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "Travel Visa Requirements Index", 
    url: toolUrl, 
    description: "Check visa requirements and travel restrictions based on your passport.", 
    applicationCategory: "TravelApplication", 
    operatingSystem: "All", 
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } 
  };
  const crumbsLd = { 
    "@context": "https://schema.org", 
    "@type": "BreadcrumbList", 
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL }, 
      { "@type": "ListItem", position: 2, name: "Travel Tools", item: siteURL + "/tools#cat-travel" }, 
      { "@type": "ListItem", position: 3, name: "Travel Visa Requirements Index", item: toolUrl }
    ] 
  };
  const faqLd = { 
    "@context": "https://schema.org", 
    "@type": "FAQPage", 
    mainEntity: [
      { "@type": "Question", name: "What does Visa Free mean?", acceptedAnswer: { "@type": "Answer", text: "Visa Free means you can travel to the destination country without a visa for a specified duration." } },
      { "@type": "Question", name: "How accurate is the data?", acceptedAnswer: { "@type": "Answer", text: "While we strive for accuracy, always verify with official government sources or embassies before booking travel." } }
    ] 
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <VisaIndexClient />
    
      <RelatedTools currentToolUrl="/tools/travel/visa-index" />
</div>
  );
}
