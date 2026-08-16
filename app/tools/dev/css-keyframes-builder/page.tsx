import JsonLd from "@/components/seo/json-ld";
import { CssKeyframesBuilderClient } from "@/components/tools/dev/css-keyframes-builder-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "CSS Keyframe Visual Animation Builder | Toolzium",
  description: "Visually build, preview, and generate CSS keyframe animations. Edit transform, opacity, and other properties across a custom timeline.",
  path: "/tools/dev/css-keyframes-builder",
  keywords: ["css keyframes", "css animation", "keyframe builder", "css animation generator", "visual css editor"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/dev/css-keyframes-builder";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CSS Keyframe Visual Animation Builder",
    url: toolUrl,
    description: "Visually build, preview, and generate CSS keyframe animations.",
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
      { "@type": "ListItem", position: 3, name: "CSS Keyframe Builder", item: toolUrl }
    ]
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a CSS Keyframe animation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CSS keyframes let you control the intermediate steps in a CSS animation sequence by defining styles for keyframes (or waypoints) along the animation sequence."
        }
      }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <CssKeyframesBuilderClient />
    
      <RelatedTools currentToolUrl="/tools/dev/css-keyframes-builder" />
</div>
  );
}
