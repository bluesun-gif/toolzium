import JsonLd from "@/components/seo/json-ld";
import { ColorBlindPaletteClient } from "@/components/tools/image/color-blind-palette-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Color Blindness Palette | Toolzium",
  description: "Generate and test color palettes for accessibility and different types of color vision deficiencies.",
  path: "/tools/image/color-blind-palette",
  keywords: ["color blindness", "accessibility", "color palette", "image tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/image/color-blind-palette`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Color Blindness Palette", url: toolUrl, description: "Color blindness accessible palette generator.", applicationCategory: "DesignApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: `${siteURL}/tools#cat-image` }, { "@type": "ListItem", position: 3, name: "Color Blindness Palette", item: toolUrl }] };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><ColorBlindPaletteClient />
      <RelatedTools currentToolUrl="/tools/image/color-blind-palette" />
</div>);
}
