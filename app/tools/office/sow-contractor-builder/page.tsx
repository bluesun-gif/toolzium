import JsonLd from "@/components/seo/json-ld";
import { SowContractorBuilderClient } from "@/components/tools/office/sow-contractor-builder-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Independent Contractor SOW Builder | Toolzium",
  description: "Generator for Independent Contractor Statements of Work (SOW) attached to Master Services Agreements.",
  path: "/tools/office/sow-contractor-builder",
  keywords: ["sow", "contractor", "statement of work", "builder", "office"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/office/sow-contractor-builder";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Independent Contractor SOW Builder", url: toolUrl, description: "Generator for Independent Contractor Statements of Work (SOW) attached to Master Services Agreements.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Office Tools", item: siteURL + "/tools#cat-office" }, { "@type": "ListItem", position: 3, name: "Independent Contractor SOW Builder", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is an SOW?", acceptedAnswer: { "@type": "Answer", text: "A Statement of Work (SOW) is a document routinely employed in the field of project management." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><SowContractorBuilderClient /></div>);
}
