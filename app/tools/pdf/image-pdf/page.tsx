import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ImagePdfClient from "@/components/tools/pdf/image-pdf-client";

const TITLE = "Image to PDF";
const DESCRIPTION = "Convert images to PDF and PDF pages to PNG images.";
const PATH = "/tools/pdf/image-pdf";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Image to PDF",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ImagePdfClient />
    </>
  );
}
