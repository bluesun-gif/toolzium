import JsonLd from "@/components/seo/json-ld";
import { SvgPathClient } from "@/components/tools/image/svg-path-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "SVG Path Visualizer & Editor | Toolzium",
  description: "Visually edit, inspect, and generate SVG path strings with real-time preview.",
  path: "/tools/image/svg-path",
  keywords: ["svg path", "svg editor", "path visualizer"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/image/svg-path";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "SVG Path Visualizer", url: toolUrl, description: "Visually edit SVG paths", applicationCategory: "DesignApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: siteURL + "/tools#cat-image" }, { "@type": "ListItem", position: 3, name: "SVG Path Visualizer", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is an SVG path?", acceptedAnswer: { "@type": "Answer", text: "The d attribute contains drawing commands." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><SvgPathClient />
      <RelatedTools currentToolUrl="/tools/image/svg-path" />
</div>);
}
