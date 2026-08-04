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
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <CssKeyframesClient />
    </div>
  );
}
