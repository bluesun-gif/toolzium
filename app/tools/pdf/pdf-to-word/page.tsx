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

export default function PdfToWordPage() {
  return (
    <><PdfToWordClient />
      <RelatedTools currentToolUrl="/tools/pdf/pdf-to-word" />
    </>
  );
}
