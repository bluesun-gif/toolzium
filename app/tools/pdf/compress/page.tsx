import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfCompressClient from "@/components/tools/pdf/pdf-compress-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "PDF Compress",
  description: "Reduce PDF file size while maintaining document quality.",
  path: "/tools/pdf/compress",
  keywords: ["maintaining", "reduce", "document", "size", "while", "quality", "file"],
});

<<<<<<< HEAD
export default function PdfCompressPage() {
  return (
    <><PdfCompressClient />
      <RelatedTools currentToolUrl="/tools/pdf/compress" />
    </>
=======
export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "PDF Compress",
    description: "Reduce PDF file size while maintaining document quality.",
    path: "/tools/pdf/compress",
    categoryName: "Pdf",
    categoryPath: "/tools/pdf",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <PdfCompressClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
