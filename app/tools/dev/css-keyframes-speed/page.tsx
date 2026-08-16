import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CssKeyframesSpeedClient from "@/components/tools/dev/css-keyframes-speed-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "CSS Keyframe Visual Curve & Speed Builder",
  description: "Visual CSS keyframe animation timing curve builder. Cubic-bezier parameters, easing presets, speed duration, and live ball preview.",
  path: "/tools/dev/css-keyframes-speed",
  keywords: ["animation", "parameters", "visual", "presets", "builder", "bezier", "keyframe", "easing", "curve", "speed", "timing", "cubic"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/dev/css-keyframes-speed";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "CSS Keyframe Visual Curve & Speed Builder", url: toolUrl, description: "Visual CSS keyframe animation timing curve builder.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: siteURL + "/tools#cat-dev" }, { "@type": "ListItem", position: 3, name: "CSS Keyframes Speed", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is CSS Keyframe?", acceptedAnswer: { "@type": "Answer", text: "CSS keyframes allow you to control the intermediate steps in a CSS animation sequence." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><CssKeyframesSpeedClient />
      <RelatedTools currentToolUrl="/tools/dev/css-keyframes-speed" />
</div>);
}
