import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ImageResizeClient from "@/components/tools/image/image-resize-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Image Resize",
  description: "Resize, crop, or scale images easily",
  path: "/tools/image/resize",
  keywords: ["easily", "crop", "scale", "images", "resize"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Image Resize",
    description: "Resize, crop, or scale images easily",
    path: "/tools/image/resize",
    categoryName: "Image",
    categoryPath: "/tools/image",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ImageResizeClient />
    
      <RelatedTools currentToolUrl="/tools/image/resize" />
</div>
  );
}
