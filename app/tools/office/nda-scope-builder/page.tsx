import JsonLd from "@/components/seo/json-ld";
import { NdaScopeBuilderClient } from "@/components/tools/office/nda-scope-builder-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Mutual NDA Scope & Term Builder | Toolzium",
  description: "Generator for Mutual and Unilateral Non-Disclosure Agreements with custom confidential information scope clauses.",
  path: "/tools/office/nda-scope-builder",
  keywords: ["NDA generator", "non-disclosure agreement", "confidentiality agreement", "legal tool", "contract builder"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/office/nda-scope-builder";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Mutual NDA Scope & Term Builder", url: toolUrl, description: "Generator for Mutual and Unilateral Non-Disclosure Agreements with custom confidential information scope clauses.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Office Tools", item: siteURL + "/tools#cat-office" }, { "@type": "ListItem", position: 3, name: "Mutual NDA Scope & Term Builder", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is an NDA?", acceptedAnswer: { "@type": "Answer", text: "A non-disclosure agreement (NDA) is a legal contract that establishes a confidential relationship." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <NdaScopeBuilderClient />
    </div>
  );
}
