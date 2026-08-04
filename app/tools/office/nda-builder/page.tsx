import JsonLd from "@/components/seo/json-ld";
import { NdaBuilderClient } from "@/components/tools/office/nda-builder-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Mutual NDA Generator | Toolzium",
  description: "Generate formal Mutual or One-Way Non-Disclosure Agreements.",
  path: "/tools/office/nda-builder",
  keywords: ["nda", "non-disclosure agreement", "generator", "office tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/office/nda-builder";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "NDA Generator", url: toolUrl, description: "Generate formal Mutual or One-Way Non-Disclosure Agreements.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Office Tools", item: siteURL + "/tools#cat-office" }, { "@type": "ListItem", position: 3, name: "NDA Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is an NDA?", acceptedAnswer: { "@type": "Answer", text: "A non-disclosure agreement is a legally binding contract that establishes a confidential relationship." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <NdaBuilderClient />
    </div>
  );
}
