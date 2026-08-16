import JsonLd from "@/components/seo/json-ld";
import { SopBuilderClient } from "@/components/tools/office/sop-builder-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "SOP Template Builder | Toolzium",
  description: "Create Standard Operating Procedure documents easily.",
  path: "/tools/office/sop-builder",
  keywords: ["SOP builder", "standard operating procedure", "SOP template", "office tool"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/office/sop-builder`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "SOP Template Builder", url: toolUrl, description: "Create SOP documents.", applicationCategory: "BusinessApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Office Tools", item: `${siteURL}/tools#cat-office` }, { "@type": "ListItem", position: 3, name: "SOP Builder", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is the SOP Template Builder?", acceptedAnswer: { "@type": "Answer", text: "A tool to create Standard Operating Procedure documents easily." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <SopBuilderClient />
    
      <RelatedTools currentToolUrl="/tools/office/sop-builder" />
</div>
  );
}
