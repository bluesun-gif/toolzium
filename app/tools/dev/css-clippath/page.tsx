import JsonLd from "@/components/seo/json-ld";
import CssClippathClient from "@/components/tools/dev/css-clippath-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CSS Clip-Path Maker | Toolzium",
  description: "Interactive CSS clip-path generator. Create custom shapes, polygons, and complex paths for your web design.",
  path: "/tools/dev/css-clippath",
  keywords: ["css clip-path generator", "clip-path maker", "css shape generator", "developer tool"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/dev/css-clippath";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "CSS Clip-Path Maker", url: toolUrl, description: "Interactive CSS clip-path generator.", applicationCategory: "DeveloperApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: siteURL + "/tools#cat-dev" }, { "@type": "ListItem", position: 3, name: "CSS Clip-Path Maker", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is CSS clip-path?", acceptedAnswer: { "@type": "Answer", text: "CSS clip-path property allows you to create complex shapes by clipping an element to a basic shape." } }] };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <CssClippathClient />
    </div>
  );
}
