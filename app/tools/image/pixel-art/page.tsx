import JsonLd from "@/components/seo/json-ld";
import { PixelArtClient } from "@/components/tools/image/pixel-art-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Pixel Art Creator | Toolzium",
  description: "Draw and create your own pixel art online. Export high-quality PNGs with custom palettes and grid sizes.",
  path: "/tools/image/pixel-art",
  keywords: ["pixel art", "sprite editor", "pixel drawing", "8bit art creator"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/image/pixel-art`;
  
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Pixel Art Creator",
    url: toolUrl,
    description: "Draw and create your own pixel art online. Export high-quality PNGs with custom palettes and grid sizes.",
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
      { "@type": "ListItem", position: 3, name: "Pixel Art Creator", item: toolUrl }
    ]
  };

  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <PixelArtClient />
    
      <RelatedTools currentToolUrl="/tools/image/pixel-art" />
</div>
  );
}
