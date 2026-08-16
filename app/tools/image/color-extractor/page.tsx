import JsonLd from "@/components/seo/json-ld";
import { ColorExtractorClient } from "@/components/tools/image/color-extractor-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Image Color Extractor | Toolzium",
  description: "Extract dominant colors and create beautiful palettes from any image.",
  path: "/tools/image/color-extractor",
  keywords: ["image color extractor", "color palette generator", "extract colors from image"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/image/color-extractor`;
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Image Color Extractor", url: toolUrl, description: "Extract dominant colors and create beautiful palettes from any image.", applicationCategory: "UtilitiesApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: `${siteURL}/tools#cat-image` }, { "@type": "ListItem", position: 3, name: "Image Color Extractor", item: toolUrl }] };
  
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <ColorExtractorClient />
    
      <RelatedTools currentToolUrl="/tools/image/color-extractor" />
</div>
  );
}
