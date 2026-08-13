import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfCompressClient from "@/components/tools/pdf/pdf-compress-client";

export const metadata = buildMetadata({
  title: "PDF Compress",
  description: "Reduce PDF file size while maintaining document quality.",
  path: "/tools/pdf/compress",
  keywords: ["maintaining", "reduce", "document", "size", "while", "quality", "file"],
});

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
  );
}
