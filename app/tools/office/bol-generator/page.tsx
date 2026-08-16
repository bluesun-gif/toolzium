import JsonLd from "@/components/seo/json-ld";
import { BolGeneratorClient } from "@/components/tools/office/bol-generator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Bill of Lading (BOL) Generator | Toolzium",
  description: "Generate official Bill of Lading (BOL) logistics shipping documents.",
  path: "/tools/office/bol-generator",
  keywords: ["bol", "bill of lading", "generator", "shipping", "logistics", "freight"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/office/bol-generator";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "BOL Generator", url: toolUrl, description: "Generate official Bill of Lading (BOL) logistics shipping documents.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Office Tools", item: siteURL + "/tools#cat-office" }, { "@type": "ListItem", position: 3, name: "BOL Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is a Bill of Lading?", acceptedAnswer: { "@type": "Answer", text: "A Bill of Lading (BOL) is a legally binding document issued by a carrier to a shipper that details the type, quantity, and destination of the goods being carried." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><BolGeneratorClient />
      <RelatedTools currentToolUrl="/tools/office/bol-generator" />
</div>);
}
