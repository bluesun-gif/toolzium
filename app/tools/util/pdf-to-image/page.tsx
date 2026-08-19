import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfToImageClient from "@/components/tools/util/pdf-to-image-client";

const TITLE = "PDF to Image Converter | Toolzium";
const DESCRIPTION = "Convert PDF pages to PNG or JPEG images instantly in your browser. 100% private — no upload required. Download all pages as ZIP. Free.";
const PATH = "/tools/util/pdf-to-image";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Pdf To Image",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PdfToImageClient />
    </>
  );
}
