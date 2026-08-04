import JsonLd from "@/components/seo/json-ld";
import { CssTransform2dClient } from "@/components/tools/dev/css-transform-2d-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CSS 2D Transform Matrix & Style Generator | Toolzium",
  description: "Visually generate CSS 2D transforms and transform-origin properties with interactive live preview. Sliders for translate, scale, rotate, and skew.",
  path: "/tools/dev/css-transform-2d",
  keywords: ["css transform generator", "css 2d transform", "css scale", "css rotate", "css skew", "developer tool"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/dev/css-transform-2d";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "CSS 2D Transform Generator", url: toolUrl, description: "Visually generate CSS 2D transforms and transform-origin properties with interactive live preview.", applicationCategory: "DeveloperApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: siteURL + "/tools#cat-dev" }, { "@type": "ListItem", position: 3, name: "CSS Transform 2D", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is CSS transform?", acceptedAnswer: { "@type": "Answer", text: "CSS transform lets you modify the coordinate space of the CSS visual formatting model. You can translate, rotate, scale, and skew elements." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><CssTransform2dClient /></div>);
}
