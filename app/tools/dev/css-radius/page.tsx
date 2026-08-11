import JsonLd from "@/components/seo/json-ld";
import CssRadiusClient from "@/components/tools/dev/css-radius-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CSS Border-Radius Custom Shape Generator | Toolzium",
  description: "Generate 8-point fancy blob and custom CSS border-radius shapes with live preview.",
  path: "/tools/dev/css-radius",
  keywords: ["css", "border-radius", "blob generator", "css shape generator", "web development tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/dev/css-radius";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "CSS Border-Radius Custom Shape Generator", url: toolUrl, description: "Generate 8-point fancy blob and custom CSS border-radius shapes with live preview.", applicationCategory: "DeveloperApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: siteURL + "/tools#cat-dev" }, { "@type": "ListItem", position: 3, name: "CSS Border-Radius Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is an 8-point border radius?", acceptedAnswer: { "@type": "Answer", text: "CSS border-radius supports up to 8 values, allowing you to specify horizontal and vertical radii for all 4 corners independently to create complex shapes." } }, { "@type": "Question", name: "How to use this generator?", acceptedAnswer: { "@type": "Answer", text: "Use the sliders to adjust the corner radii or choose a preset shape, then copy the generated CSS snippet." } }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <CssRadiusClient />
    </div>
  );
}
