import JsonLd from "@/components/seo/json-ld";
import { CurrencyMatrixClient } from "@/components/tools/travel/currency-matrix-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Multi-Currency Exchange Matrix | Toolzium",
  description: "View cross-rate exchange matrix for multiple currencies simultaneously. Great for multi-country travel planning.",
  path: "/tools/travel/currency-matrix",
  keywords: ["currency exchange", "exchange matrix", "travel exchange rates", "currency converter"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/travel/currency-matrix";
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "Multi-Currency Exchange Matrix", 
    url: toolUrl, 
    description: "Multi-currency cross-rate matrix table for travelers.", 
    applicationCategory: "UtilitiesApplication", 
    operatingSystem: "All", 
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } 
  };
  const crumbsLd = { 
    "@context": "https://schema.org", 
    "@type": "BreadcrumbList", 
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL }, 
      { "@type": "ListItem", position: 2, name: "Travel Tools", item: siteURL + "/tools#cat-travel" }, 
      { "@type": "ListItem", position: 3, name: "Multi-Currency Exchange Matrix", item: toolUrl }
    ] 
  };
  const faqLd = { 
    "@context": "https://schema.org", 
    "@type": "FAQPage", 
    mainEntity: [
      { "@type": "Question", name: "How many currencies can I compare?", acceptedAnswer: { "@type": "Answer", text: "You can compare up to 8 currencies simultaneously in the matrix." } }
    ] 
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <CurrencyMatrixClient />
    
      <RelatedTools currentToolUrl="/tools/travel/currency-matrix" />
</div>
  );
}
