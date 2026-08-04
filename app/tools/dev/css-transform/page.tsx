import JsonLd from "@/components/seo/json-ld";
import { CssTransformClient } from "@/components/tools/dev/css-transform-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CSS 3D Transform Generator | Toolzium",
  description: "Interactive 3D CSS transform generator with live preview.",
  path: "/tools/dev/css-transform",
  keywords: ["css", "transform", "3d", "generator", "developer"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/dev/css-transform";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "CSS 3D Transform Generator", url: toolUrl, description: "Interactive 3D CSS transform generator with live preview.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: siteURL + "/tools#cat-dev" }, { "@type": "ListItem", position: 3, name: "CSS 3D Transform Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is this tool?", acceptedAnswer: { "@type": "Answer", text: "It generates CSS 3D transforms interactively." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <CssTransformClient />
    </div>
  );
}
