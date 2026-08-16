import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ImagePdfClient from "@/components/tools/pdf/image-pdf-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Image to PDF",
  description: "Convert images to PDF and PDF pages to PNG images.",
  path: "/tools/pdf/image-pdf",
  keywords: ["convert", "images", "pages"],
});

export default function ImagePdfPage() {
  return (
    <><ImagePdfClient />
      <RelatedTools currentToolUrl="/tools/pdf/image-pdf" />
    </>
  );
}
