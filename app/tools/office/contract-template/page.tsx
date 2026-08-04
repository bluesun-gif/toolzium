import JsonLd from "@/components/seo/json-ld";
import { ContractTemplateClient } from "@/components/tools/office/contract-template-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contract Template Generator | Toolzium",
  description: "Generate basic contract templates for various needs.",
  path: "/tools/office/contract-template",
  keywords: ["contract", "template", "generator", "nda"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/office/contract-template";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Contract Template Generator", url: toolUrl, description: "Generate basic contract templates.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Office Tools", item: siteURL + "/tools#cat-office" }, { "@type": "ListItem", position: 3, name: "Contract Template Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Is this legal advice?", acceptedAnswer: { "@type": "Answer", text: "No, these are templates. Consult a lawyer for legal advice." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <ContractTemplateClient />
    </div>
  );
}
