import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ColorConverterClient from "@/components/tools/dev/color-converter-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "Color Converter",
  description: "Convert between HEX, RGB, HSL, and CMYK color formats. Color picker and converter with live preview. Extract colors from images and generate color palettes for web design.",
  path: "/tools/dev/color-converter",
  keywords: ["preview", "between", "with", "convert", "picker", "converter", "color", "extract", "cmyk", "formats", "live"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Color Converter",
    description: "Convert between HEX, RGB, HSL, and CMYK color formats. Color picker and converter with live preview. Extract colors from images and generate color palettes for web design.",
    path: "/tools/dev/color-converter",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ColorConverterClient />
    
      <RelatedTools currentToolUrl="/tools/dev/color-converter" />
</div>
  );
}
