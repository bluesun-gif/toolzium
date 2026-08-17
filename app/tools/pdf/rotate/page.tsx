import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfRotateClient from "@/components/tools/pdf/pdf-rotate-client";

const TITLE = "PDF Page Rotate";
const DESCRIPTION = "Rotate selected PDF pages clockwise or counter-clockwise.";
const PATH = "/tools/pdf/rotate";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "PDF Page Rotate",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PdfRotateClient />
    </>
  );
}
