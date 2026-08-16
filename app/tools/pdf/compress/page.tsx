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

export default function PdfCompressPage() {
  return (
    <><PdfCompressClient />
      <RelatedTools currentToolUrl="/tools/pdf/compress" />
    </>
  );
}
