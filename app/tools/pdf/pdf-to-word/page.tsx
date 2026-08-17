import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfToWordClient from "@/components/tools/pdf/pdf-to-word-client";

const TITLE = "PDF to Word";
const DESCRIPTION = "Convert PDF documents into editable Word text files.";
const PATH = "/tools/pdf/pdf-to-word";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "PDF to Word",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PdfToWordClient />
    </>
  );
}
