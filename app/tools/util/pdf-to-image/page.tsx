import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfToImageClient from "@/components/tools/util/pdf-to-image-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "PDF to Image Converter",
  description: "Convert PDF pages to high-quality PNG or JPG images. Extract individual pages or all pages as zip. Fast, free, browser-based PDF image extractor.",
  path: "/tools/util/pdf-to-image",
  keywords: ["pages", "convert", "browser", "free", "quality", "images", "extract", "fast", "individual", "high"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "PDF to Image Converter",
    description: "Convert PDF pages to high-quality PNG or JPG images. Extract individual pages or all pages as zip. Fast, free, browser-based PDF image extractor.",
    path: "/tools/util/pdf-to-image",
    categoryName: "Util",
    categoryPath: "/tools/util",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <PdfToImageClient />
<<<<<<< HEAD
    
      <RelatedTools currentToolUrl="/tools/util/pdf-to-image" />
</>
=======
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
