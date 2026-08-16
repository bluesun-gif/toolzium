import JsonLd from "@/components/seo/json-ld";
import { PaletteExtractClient } from "@/components/tools/image/palette-extract-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Color Palette from Image | Toolzium",
  description: "Extract beautiful color palettes from any image. Get hex, RGB, and HSL values instantly for your design projects.",
  path: "/tools/image/palette-extract",
  keywords: ["color palette generator", "extract color from image", "image color picker", "design tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/image/palette-extract`;
  const appLd = { 
    "@context": "https://schema.org", 
    "@type": "WebApplication", 
    name: "Color Palette from Image", 
    url: toolUrl, 
    description: "Extract color palettes from images.", 
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
      { "@type": "ListItem", position: 3, name: "Palette Extract", item: toolUrl }
    ] 
  };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <PaletteExtractClient />
    
      <RelatedTools currentToolUrl="/tools/image/palette-extract" />
</div>
  );
}
