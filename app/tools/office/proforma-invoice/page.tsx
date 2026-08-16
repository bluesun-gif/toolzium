import JsonLd from "@/components/seo/json-ld";
import { ProformaInvoiceClient } from "@/components/tools/office/proforma-invoice-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Proforma Invoice Generator | Toolzium",
  description: "Generate preliminary Proforma Invoices for trade proposals with itemized tables, taxes, and shipping estimates.",
  path: "/tools/office/proforma-invoice",
  keywords: ["proforma invoice", "invoice generator", "office tools", "trade proposal", "preliminary invoice"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/office/proforma-invoice";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Proforma Invoice Generator", url: toolUrl, description: "Generate preliminary Proforma Invoices for trade proposals with itemized tables, taxes, and shipping estimates.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Office Tools", item: siteURL + "/tools#cat-office" }, { "@type": "ListItem", position: 3, name: "Proforma Invoice Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is a Proforma Invoice?", acceptedAnswer: { "@type": "Answer", text: "A proforma invoice is a preliminary bill of sale sent to buyers in advance of a shipment or delivery of goods." } }, { "@type": "Question", name: "How do I use this generator?", acceptedAnswer: { "@type": "Answer", text: "Fill in the seller and buyer info, add items with their prices, set taxes and shipping, then print or copy the invoice." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><ProformaInvoiceClient />
      <RelatedTools currentToolUrl="/tools/office/proforma-invoice" />
</div>);
}
