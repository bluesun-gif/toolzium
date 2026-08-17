import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfCompressClient from "@/components/tools/pdf/pdf-compress-client";

const TITLE = "PDF Compress";
const DESCRIPTION = "Reduce PDF file size while maintaining document quality.";
const PATH = "/tools/pdf/compress";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "PDF Compress",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PdfCompressClient />
    </>
  );
}
