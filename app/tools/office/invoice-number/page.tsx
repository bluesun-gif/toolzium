import JsonLd from "@/components/seo/json-ld";
import { InvoiceNumberClient } from "@/components/tools/office/invoice-number-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Invoice Number Generator | Toolzium",
  description: "Generate and format sequential invoice numbers in batches.",
  path: "/tools/office/invoice-number",
  keywords: ["invoice", "number", "generator", "office", "sequential"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/office/invoice-number`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Invoice Number Generator", url: toolUrl, description: "Generate sequential invoice numbers", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Office Tools", item: `${siteURL}/tools#cat-office` }, { "@type": "ListItem", position: 3, name: "Invoice Number Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How do I generate an invoice number?", acceptedAnswer: { "@type": "Answer", text: "Select your format preferences and click generate." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><InvoiceNumberClient />
      <RelatedTools currentToolUrl="/tools/office/invoice-number" />
</div>);
}
