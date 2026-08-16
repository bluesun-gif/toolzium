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
  
<<<<<<< HEAD
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} /><ColorPaletteExportClient />
      <RelatedTools currentToolUrl="/tools/image/color-palette-export" />
</div>);
=======

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the Color Palette SVG & CSS Swatch Exporter work?", acceptedAnswer: { "@type": "Answer", text: "Toolzium's Color Palette SVG & CSS Swatch Exporter runs instantly in your browser. Create custom 3 to 10-color design palettes and export as SVG swatch image, CSS Variables, Tailwind CSS config, or JSON. No sign-up or software installation required." } },
      { "@type": "Question", name: "Is the Color Palette SVG & CSS Swatch Exporter 100% free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Color Palette SVG & CSS Swatch Exporter is 100% free with unlimited usage and no account required." } },
      { "@type": "Question", name: "Is my data secure when using the Color Palette SVG & CSS Swatch Exporter?", acceptedAnswer: { "@type": "Answer", text: "Yes, all processing occurs locally in your browser. Your data never leaves your device." } }
    ]
  };
  return (<div className="space-y-4"><JsonLd data={appLd} /><JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} /><ColorPaletteExportClient /></div>);
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
}
