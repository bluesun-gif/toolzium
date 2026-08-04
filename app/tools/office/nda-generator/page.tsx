import JsonLd from "@/components/seo/json-ld";
import { NdaGeneratorClient } from "@/components/tools/office/nda-generator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "NDA Generator | Toolzium",
  description: "Generate Non-Disclosure Agreements.",
  path: "/tools/office/nda-generator",
  keywords: ["nda", "non-disclosure agreement", "generator"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/office/nda-generator";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "NDA Generator", url: toolUrl, description: "Generate NDAs", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Office Tools", item: siteURL + "/tools#cat-office" }, { "@type": "ListItem", position: 3, name: "NDA Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is an NDA?", acceptedAnswer: { "@type": "Answer", text: "A non-disclosure agreement is a legal contract." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><NdaGeneratorClient /></div>);
}
