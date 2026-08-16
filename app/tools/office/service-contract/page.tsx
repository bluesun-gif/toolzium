import JsonLd from "@/components/seo/json-ld";
import { ServiceContractClient } from "@/components/tools/office/service-contract-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Professional Service Contract Generator | Toolzium",
  description: "Generate formal Professional Service Contracts & Independent Contractor Agreements quickly and easily.",
  path: "/tools/office/service-contract",
  keywords: ["service contract", "agreement generator", "contract generator", "independent contractor agreement"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/office/service-contract";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Professional Service Contract Generator", url: toolUrl, description: "Generate formal Professional Service Contracts & Independent Contractor Agreements quickly and easily.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Office Tools", item: siteURL + "/tools#cat-office" }, { "@type": "ListItem", position: 3, name: "Professional Service Contract Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is a service contract?", acceptedAnswer: { "@type": "Answer", text: "A service contract is an agreement between a service provider and a client that outlines the terms of service." } }] };
  
  return (
    <div className={"space-y-4"}>
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <ServiceContractClient />
    
      <RelatedTools currentToolUrl="/tools/office/service-contract" />
</div>
  );
}
