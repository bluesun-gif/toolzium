import JsonLd from "@/components/seo/json-ld";
import { PackingSlipClient } from "@/components/tools/office/packing-slip-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Packing Slip Generator | Toolzium",
  description: "Generate professional ecommerce and warehouse packing slips easily.",
  path: "/tools/office/packing-slip",
  keywords: ["packing slip", "generator", "ecommerce", "warehouse", "invoice"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/office/packing-slip";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Packing Slip Generator", url: toolUrl, description: "Generate professional ecommerce and warehouse packing slips easily.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Office Tools", item: siteURL + "/tools#cat-office" }, { "@type": "ListItem", position: 3, name: "Packing Slip Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is a packing slip?", acceptedAnswer: { "@type": "Answer", text: "A packing slip is a document that includes the complete list of items included in a package." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <PackingSlipClient />
    
      <RelatedTools currentToolUrl="/tools/office/packing-slip" />
</div>
  );
}
