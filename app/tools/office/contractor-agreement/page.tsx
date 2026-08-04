import JsonLd from "@/components/seo/json-ld";
import { ContractorAgreementClient } from "@/components/tools/office/contractor-agreement-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Independent Contractor Agreement Builder | Toolzium",
  description: "Generate formal Independent Contractor & Freelance Agreements easily.",
  path: "/tools/office/contractor-agreement",
  keywords: ["contractor agreement", "freelance contract", "business tools", "legal"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/office/contractor-agreement";
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Independent Contractor Agreement Builder",
    url: toolUrl,
    description: "Generate formal Independent Contractor & Freelance Agreements easily.",
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
      { "@type": "ListItem", position: 3, name: "Contractor Agreement Builder", item: toolUrl }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <ContractorAgreementClient />
    </div>
  );
}
