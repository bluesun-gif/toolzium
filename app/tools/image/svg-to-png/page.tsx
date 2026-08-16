import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SvgToPngClient from "@/components/tools/image/svg-to-png-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "SVG to PNG Converter",
  description: "Convert SVG files to PNG images. Upload or paste SVG code. Set dimensions, scale (1x-4x), transparent or custom background. Preview and download as PNG.",
  path: "/tools/image/svg-to-png",
  keywords: ["preview", "paste", "convert", "files", "background", "upload", "scale", "transparent", "images", "custom", "code", "dimensions"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "SVG to PNG Converter",
    description: "Convert SVG files to PNG images. Upload or paste SVG code. Set dimensions, scale (1x-4x), transparent or custom background. Preview and download as PNG.",
    path: "/tools/image/svg-to-png",
    categoryName: "Image",
    categoryPath: "/tools/image",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <SvgToPngClient />
<<<<<<< HEAD
    
      <RelatedTools currentToolUrl="/tools/image/svg-to-png" />
</>
=======
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
