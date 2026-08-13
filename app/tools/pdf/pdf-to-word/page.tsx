import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfToWordClient from "@/components/tools/pdf/pdf-to-word-client";

export const metadata = buildMetadata({
  title: "PDF to Word",
  description: "Convert PDF documents into editable Word text files.",
  path: "/tools/pdf/pdf-to-word",
  keywords: ["into", "convert", "editable", "text", "files", "word", "documents"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "PDF to Word",
    description: "Convert PDF documents into editable Word text files.",
    path: "/tools/pdf/pdf-to-word",
    categoryName: "Pdf",
    categoryPath: "/tools/pdf",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <PdfToWordClient />
    </div>
  );
}
