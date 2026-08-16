import JsonLd from "@/components/seo/json-ld";
import { LetterTemplateClient } from "@/components/tools/office/letter-template-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Letter Template Generator | Toolzium",
  description: "Generate formal letter templates including resignation, recommendation, and complaint.",
  path: "/tools/office/letter-template",
  keywords: ["letter template", "formal letter", "office", "resignation", "generator"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/office/letter-template";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Letter Template Generator", url: toolUrl, description: "Generate formal letter templates.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Office Tools", item: siteURL + "/tools#cat-office" }, { "@type": "ListItem", position: 3, name: "Letter Template Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What templates are available?", acceptedAnswer: { "@type": "Answer", text: "We offer resignation, recommendation, complaint, thank you, apology, request, and authorization templates." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <LetterTemplateClient />
    
      <RelatedTools currentToolUrl="/tools/office/letter-template" />
</div>
  );
}
