import JsonLd from "@/components/seo/json-ld";
import { ColorContrastClient } from "@/components/tools/image/color-contrast-checker-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Image & Palette Color Contrast Checker | Toolzium",
  description: "Check WCAG 2.1 accessibility color contrast ratios between text color and background color.",
  path: "/tools/image/color-contrast-checker",
  keywords: ["color contrast checker", "wcag", "accessibility", "contrast ratio", "color palette"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/image/color-contrast-checker`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Image & Palette Color Contrast Checker",
    url: toolUrl,
    description: "Check WCAG 2.1 accessibility color contrast ratios between text color and background color.",
    applicationCategory: "DesignApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Image Tools", item: `${siteURL}/tools#cat-image` },
      { "@type": "ListItem", position: 3, name: "Color Contrast Checker", item: toolUrl }
    ]
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <ColorContrastClient />
    
      <RelatedTools currentToolUrl="/tools/image/color-contrast-checker" />
</div>
  );
}
