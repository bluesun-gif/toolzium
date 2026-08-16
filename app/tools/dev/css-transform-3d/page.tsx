import JsonLd from "@/components/seo/json-ld";
import { CssTransform3dClient } from "@/components/tools/dev/css-transform-3d-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "CSS 3D Transform Generator | Toolzium",
  description: "Interactive visual 3D CSS transform & perspective generator.",
  path: "/tools/dev/css-transform-3d",
  keywords: ["css", "3d", "transform", "perspective", "generator", "developer"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/dev/css-transform-3d";
  
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "CSS 3D Transform Generator", 
    url: toolUrl, 
    description: "Interactive visual 3D CSS transform & perspective generator.", 
    applicationCategory: "DeveloperApplication", 
    operatingSystem: "All", 
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } 
  };
  
  const crumbsLd = { 
    "@context": "https://schema.org", 
    "@type": "BreadcrumbList", 
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL }, 
      { "@type": "ListItem", position: 2, name: "Developer Tools", item: siteURL + "/tools#cat-dev" }, 
      { "@type": "ListItem", position: 3, name: "CSS 3D Transform Generator", item: toolUrl }
    ] 
  };
  
  const faqLd = { 
    "@context": "https://schema.org", 
    "@type": "FAQPage", 
    mainEntity: [
      { "@type": "Question", name: "What is CSS 3D Transform?", acceptedAnswer: { "@type": "Answer", text: "CSS 3D Transform allows you to position and rotate elements in 3D space." } }
    ] 
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <CssTransform3dClient />
    
      <RelatedTools currentToolUrl="/tools/dev/css-transform-3d" />
</div>
  );
}
