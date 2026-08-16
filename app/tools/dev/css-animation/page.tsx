import JsonLd from "@/components/seo/json-ld";
import { CssAnimationClient } from "@/components/tools/dev/css-animation-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "CSS Animation Generator | Toolzium",
  description: "Generate CSS keyframe animations visually.",
  path: "/tools/dev/css-animation",
  keywords: ["css", "animation", "generator", "keyframes", "developer tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/dev/css-animation";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "CSS Animation Generator", url: toolUrl, description: "Generate CSS keyframe animations visually.", applicationCategory: "DeveloperApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: siteURL + "/tools#cat-dev" }, { "@type": "ListItem", position: 3, name: "CSS Animation Generator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is this tool?", acceptedAnswer: { "@type": "Answer", text: "It generates CSS keyframe animations visually." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><CssAnimationClient />
      <RelatedTools currentToolUrl="/tools/dev/css-animation" />
</div>);
}
