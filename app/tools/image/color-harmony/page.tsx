import JsonLd from "@/components/seo/json-ld";
import { ColorHarmonyClient } from "@/components/tools/image/color-harmony-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Color Palette Harmonizer & Generator | Toolzium",
  description: "Generate color harmony palettes based on color theory.",
  path: "/tools/image/color-harmony",
  keywords: ["color", "palette", "harmony", "generator"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/image/color-harmony";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Color Palette Harmonizer", url: toolUrl, description: "Generate color harmony palettes based on color theory.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: siteURL + "/tools#cat-image" }, { "@type": "ListItem", position: 3, name: "Color Palette Harmonizer", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How to generate?", acceptedAnswer: { "@type": "Answer", text: "Pick a base color and select a harmony rule." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><ColorHarmonyClient /></div>);
}
