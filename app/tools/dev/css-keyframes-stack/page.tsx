import JsonLd from "@/components/seo/json-ld";
import { CssKeyframesStackClient } from "@/components/tools/dev/css-keyframes-stack-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CSS Keyframe Multi-Animation Stacker | Toolzium",
  description: "Visual CSS multi-animation builder. Chain multiple @keyframes on a single element and generate the CSS snippet.",
  path: "/tools/dev/css-keyframes-stack",
  keywords: ["css", "keyframes", "animation", "builder", "stacker", "multi-animation"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/dev/css-keyframes-stack";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "CSS Keyframe Multi-Animation Stacker", url: toolUrl, description: "Visual CSS multi-animation builder. Chain multiple @keyframes on a single element.", applicationCategory: "DeveloperApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: siteURL + "/tools#cat-dev" }, { "@type": "ListItem", position: 3, name: "CSS Keyframe Multi-Animation Stacker", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How do I chain multiple CSS animations?", acceptedAnswer: { "@type": "Answer", text: "You can chain multiple CSS animations by separating them with a comma in the animation property, e.g. animation: spin 2s linear infinite, pulse 1s ease-in-out infinite;" } }, { "@type": "Question", name: "What properties can I control per animation layer?", acceptedAnswer: { "@type": "Answer", text: "You can control animation-name, duration (s), timing-function, delay (s), iteration-count, and direction." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><CssKeyframesStackClient /></div>);
}
