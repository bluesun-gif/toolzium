import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ColorBlindnessClient from "@/components/tools/dev/color-blindness-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Color Blindness Simulator",
  description: "Simulate how colors appear to people with color blindness. Test hex colors against Protanopia, Deuteranopia, Tritanopia, and Achromatopsia. Essential accessibility tool for designers and developers.",
  path: "/tools/dev/color-blindness",
  keywords: ["against", "with", "simulate", "colors", "test", "deuteranopia", "color", "protanopia", "people", "blindness", "appear"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/dev/color-blindness`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Color Blindness Simulator", url: toolUrl, description: "Simulate how images and colors appear to people with different types of color blindness.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Developer Tools", item: `${siteURL}/tools#cat-dev` }, { "@type": "ListItem", position: 3, name: "Color Blindness Simulator", item: toolUrl }] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What is Protanopia?", acceptedAnswer: { "@type": "Answer", text: "Protanopia is a type of red-green color blindness where the red cones are missing." } }, { "@type": "Question", name: "How can I simulate color blindness?", acceptedAnswer: { "@type": "Answer", text: "You can use this tool to upload an image or enter a hex color and see it as someone with color blindness would." } }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><JsonLd data={faqLd} /><ColorBlindnessClient />
      <RelatedTools currentToolUrl="/tools/dev/color-blindness" />
</div>);
}
