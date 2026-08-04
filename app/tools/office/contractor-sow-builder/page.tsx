import JsonLd from "@/components/seo/json-ld";
import { ContractorSowBuilderClient } from "@/components/tools/office/contractor-sow-builder-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contractor Scope of Work & Deliverables Builder | Toolzium",
  description: "Generate formal Statement of Work (SOW) documents for independent contractors and freelancers.",
  path: "/tools/office/contractor-sow-builder",
  keywords: ["SOW", "statement of work", "contractor", "deliverables", "office tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/office/contractor-sow-builder";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Contractor Scope of Work Builder",
    url: toolUrl,
    description: "Generate formal Statement of Work (SOW) documents for independent contractors.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Office Tools", item: siteURL + "/tools#cat-office" },
      { "@type": "ListItem", position: 3, name: "Contractor SOW Builder", item: toolUrl },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an SOW?",
        acceptedAnswer: { "@type": "Answer", text: "A Statement of Work (SOW) outlines project details and deliverables." },
      },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <ContractorSowBuilderClient />
    </div>
  );
}
