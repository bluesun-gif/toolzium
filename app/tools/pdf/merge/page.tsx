import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfMergeClient from "@/components/tools/pdf/pdf-merge-client";

const TITLE = "PDF Merge";
const DESCRIPTION = "Combine multiple PDF files into one online for free.";
const PATH = "/tools/pdf/merge";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "PDF Merge",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PdfMergeClient />
    </>
  );
}
