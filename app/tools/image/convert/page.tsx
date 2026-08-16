import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ImageConvertClient from "@/components/tools/image/image-convert-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Image Convert",
  description: "Convert between JPG, PNG, WebP, AVIF",
  path: "/tools/image/convert",
  keywords: ["webp", "convert", "between", "avif"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Image Convert",
    description: "Convert between JPG, PNG, WebP, AVIF",
    path: "/tools/image/convert",
    categoryName: "Image",
    categoryPath: "/tools/image",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ImageConvertClient />
    
      <RelatedTools currentToolUrl="/tools/image/convert" />
</div>
  );
}
