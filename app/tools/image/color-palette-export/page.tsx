import JsonLd from "@/components/seo/json-ld";
import { ColorPaletteExportClient } from "@/components/tools/image/color-palette-export-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Color Palette Exporter | Toolzium",
  description: "Create custom color palettes and export as SVG, CSS, Tailwind config, or JSON.",
  path: "/tools/image/color-palette-export",
  keywords: ["color palette", "color export", "css generator", "image tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/image/color-palette-export";
  const appLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "Color Palette Exporter", url: toolUrl, description: "Create custom color palettes and export as SVG, CSS, Tailwind config, or JSON.", applicationCategory: "DesignApplication", operatingSystem: "All", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const crumbsLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteURL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: siteURL + "/tools#cat-image" }, { "@type": "ListItem", position: 3, name: "Color Palette Exporter", item: toolUrl }] };
  
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><ColorPaletteExportClient />
      <RelatedTools currentToolUrl="/tools/image/color-palette-export" />
</div>);
}
