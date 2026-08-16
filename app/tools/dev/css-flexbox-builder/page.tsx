import JsonLd from "@/components/seo/json-ld";
import { CssFlexboxBuilderClient } from "@/components/tools/dev/css-flexbox-builder-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "CSS Flexbox Layout Visual Builder | Toolzium",
  description: "Interactive visual CSS Flexbox playground to generate CSS layout code.",
  path: "/tools/dev/css-flexbox-builder",
  keywords: ["css", "flexbox", "layout", "visual builder", "developer tools", "playground"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/dev/css-flexbox-builder";
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "CSS Flexbox Layout Visual Builder", 
    url: toolUrl, 
    description: "Interactive visual CSS Flexbox playground to generate CSS layout code.", 
    applicationCategory: "UtilitiesApplication", 
    operatingSystem: "All", 
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } 
  };
  const crumbsLd = { 
    "@context": "https://schema.org", 
    "@type": "BreadcrumbList", 
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL }, 
      { "@type": "ListItem", position: 2, name: "Developer Tools", item: siteURL + "/tools#cat-dev" }, 
      { "@type": "ListItem", position: 3, name: "CSS Flexbox Layout Visual Builder", item: toolUrl }
    ] 
  };
  const faqLd = { 
    "@context": "https://schema.org", 
    "@type": "FAQPage", 
    mainEntity: [
      { "@type": "Question", name: "What is CSS Flexbox?", acceptedAnswer: { "@type": "Answer", text: "CSS Flexbox is a layout model that allows responsive elements within a container to be automatically arranged depending upon screen size (or device)." } }
    ] 
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <CssFlexboxBuilderClient />
    
      <RelatedTools currentToolUrl="/tools/dev/css-flexbox-builder" />
</div>
  );
}
