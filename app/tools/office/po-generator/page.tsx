import JsonLd from "@/components/seo/json-ld";
import { PurchaseOrderClient } from "@/components/tools/office/po-generator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Purchase Order Generator | Toolzium",
  description: "Generate formal Purchase Orders (PO) online.",
  path: "/tools/office/po-generator",
  keywords: ["purchase order", "po generator", "office tool", "invoice"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/office/po-generator";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Purchase Order Generator", url: toolUrl, description: "Generate formal Purchase Orders (PO) online.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Office Tools", item: siteURL + "/tools#cat-office" }, { "@type": "ListItem", position: 3, name: "Purchase Order Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to generate a PO?", acceptedAnswer: { "@type": "Answer", text: "Fill out the vendor details, items, and terms, then print or copy." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <PurchaseOrderClient />
    </div>
  );
}
