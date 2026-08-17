import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfMergeClient from "@/components/tools/util/pdf-merge-client";

const TITLE = "Pdf Merge | Toolzium";
const DESCRIPTION = "Free online pdf merge tool with instant calculation and privacy.";
const PATH = "/tools/util/pdf-merge";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Pdf Merge",
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
