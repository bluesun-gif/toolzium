import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ImageResizerClient from "@/components/tools/image/image-resizer-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Image Resizer — Resize Images Online in KB / Pixels | Toolzium",
  description: "Free online image resizer. Resize single or bulk images by pixels or percentage, maintain aspect ratio, adjust quality, and target file size in KB. Instant 100% browser-based photo resizer.",
  path: "/tools/image/image-resizer",
  keywords: ["percentage", "pixels", "online", "free", "aspect", "resizer", "images", "resize", "bulk", "maintain", "image", "single"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Image Resizer — Resize Images Online in KB / Pixels",
    description: "Free online image resizer. Resize single or bulk images by pixels or percentage, maintain aspect ratio, adjust quality, and target file size in KB. Instant 100% browser-based photo resizer.",
    path: "/tools/image/image-resizer",
    categoryName: "Image",
    categoryPath: "/tools/image",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ImageResizerClient />
<<<<<<< HEAD
    
      <RelatedTools currentToolUrl="/tools/image/image-resizer" />
</>
=======
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
