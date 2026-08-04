import JsonLd from "@/components/seo/json-ld";
import { CommercialInvoiceClient } from "@/components/tools/office/commercial-invoice-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Commercial Invoice Generator | Toolzium",
  description: "Generate international trade Commercial Invoices with ease.",
  path: "/tools/office/commercial-invoice",
  keywords: ["commercial invoice", "invoice generator", "international trade", "customs", "export invoice"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/office/commercial-invoice";
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "Commercial Invoice Generator", 
    url: toolUrl, 
    description: "Generate international trade Commercial Invoices with ease.", 
    applicationCategory: "BusinessApplication", 
    operatingSystem: "All", 
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } 
  };
  const crumbsLd = { 
    "@context": "https://schema.org", 
    "@type": "BreadcrumbList", 
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL }, 
      { "@type": "ListItem", position: 2, name: "Office Tools", item: siteURL + "/tools#cat-office" }, 
      { "@type": "ListItem", position: 3, name: "Commercial Invoice Generator", item: toolUrl }
    ] 
  };
  const faqLd = { 
    "@context": "https://schema.org", 
    "@type": "FAQPage", 
    mainEntity: [
      { "@type": "Question", name: "What is a Commercial Invoice?", acceptedAnswer: { "@type": "Answer", text: "A Commercial Invoice is a foundational document for international trade, providing essential details about the transaction for customs declaration." } }, 
      { "@type": "Question", name: "Do I need HS Codes?", acceptedAnswer: { "@type": "Answer", text: "Yes, Harmonized System (HS) Codes are standard codes used by customs authorities worldwide to classify products." } }
    ] 
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <CommercialInvoiceClient />
    </div>
  );
}
