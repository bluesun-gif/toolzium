import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfSplitClient from "@/components/tools/pdf/pdf-split-client";

const TITLE = "PDF Split";
const DESCRIPTION = "Split PDFs into individual pages or page ranges.";
const PATH = "/tools/pdf/split";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "PDF Split",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PdfSplitClient />
    </>
  );
}
