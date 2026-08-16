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

<<<<<<< HEAD
export default function ImagePdfPage() {
  return (
    <><ImagePdfClient />
      <RelatedTools currentToolUrl="/tools/pdf/image-pdf" />
    </>
=======
export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Image to PDF",
    description: "Convert images to PDF and PDF pages to PNG images.",
    path: "/tools/pdf/image-pdf",
    categoryName: "Pdf",
    categoryPath: "/tools/pdf",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ImagePdfClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
