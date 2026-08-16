import JsonLd from "@/components/seo/json-ld";
import { siteURL } from "@/lib/constants";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Image Compressor",
  description: "Compress and reduce image file size online for free. Adjust quality, supports JPEG, PNG, WebP formats. Batch compression with before/after size comparison. 100% client-side, images never leave your browser.",
  path: "/tools/image/compress",
  keywords: ["reduce", "webp", "size", "online", "free", "compress", "adjust", "file", "quality", "supports", "image", "jpeg"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Image Compressor",
    description: "Compress and reduce image file size online for free. Adjust quality, supports JPEG, PNG, WebP formats. Batch compression with before/after size comparison. 100% client-side, images never leave your browser.",
    path: "/tools/image/compress",
    categoryName: "Image",
    categoryPath: "/tools/image",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ImageCompressClient />
    
      <RelatedTools currentToolUrl="/tools/image/compress" />
</>
  );
}
