import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfToWordClient from "@/components/tools/pdf/pdf-to-word-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "PDF to Word",
  description: "Convert PDF documents into editable Word text files.",
  path: "/tools/pdf/pdf-to-word",
  keywords: ["into", "convert", "editable", "text", "files", "word", "documents"],
});

<<<<<<< HEAD
export default function PdfToWordPage() {
  return (
    <><PdfToWordClient />
      <RelatedTools currentToolUrl="/tools/pdf/pdf-to-word" />
    </>
=======
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
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
