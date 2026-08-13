import JsonLd from "@/components/seo/json-ld";
import { CssKeyframesClient } from "@/components/tools/dev/css-keyframes-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CSS Keyframe Animation Visual Generator | Toolzium",
  description: "Visually generate and customize CSS keyframe animations.",
  path: "/tools/dev/css-keyframes",
  keywords: ["css", "keyframes", "animation", "generator", "developer tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/dev/css-keyframes";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CSS Keyframe Animation Visual Generator",
    url: toolUrl,
    description: "Visually generate and customize CSS keyframe animations.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Developer Tools", item: siteURL + "/tools#cat-dev" },
      { "@type": "ListItem", position: 3, name: "CSS Keyframe Animation Visual Generator", item: toolUrl }
    ]
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the CSS Keyframe Animation Generator work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's CSS Keyframe Animation Generator runs instantly in your browser. Visual CSS @keyframes animation generator. Custom keyframe steps, pulse, bounce, shake, flip, rotate, and timing controls. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the CSS Keyframe Animation Generator 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the CSS Keyframe Animation Generator is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the CSS Keyframe Animation Generator?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <CssKeyframesClient />
    </div>
  );
}
