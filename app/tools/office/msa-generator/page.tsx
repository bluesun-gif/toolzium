import JsonLd from "@/components/seo/json-ld";
import { MSAGeneratorClient } from "@/components/tools/office/msa-generator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Master Services Agreement (MSA) Generator | Toolzium",
  description: "Generate formal Master Services Agreements (MSA) for corporate contracts & client retainers.",
  path: "/tools/office/msa-generator",
  keywords: ["msa generator", "master services agreement", "contract generator", "business contract", "office tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/office/msa-generator";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "MSA Generator", url: toolUrl, description: "Generate formal Master Services Agreements (MSA) for corporate contracts & client retainers.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Office Tools", item: siteURL + "/tools#cat-office" }, { "@type": "ListItem", position: 3, name: "MSA Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is an MSA?", acceptedAnswer: { "@type": "Answer", text: "A Master Services Agreement (MSA) is a contract that details the responsibilities and obligations of two parties to each other." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <MSAGeneratorClient />
    </div>
  );
}
