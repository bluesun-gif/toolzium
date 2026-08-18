import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfMergeClient from "@/components/tools/pdf/pdf-merge-client";

const TITLE = "Merge PDF Files Online — Combine Multiple PDFs for Free | Toolzium";
const DESCRIPTION = "Free online PDF merger. Combine multiple PDF documents into one organized file in seconds. 100% private, no signup, zero file uploads, lossless quality.";
const PATH = "/tools/pdf/merge";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Merge PDF Files Online",
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
