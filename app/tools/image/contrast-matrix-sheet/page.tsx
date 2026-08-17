import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ContrastMatrixSheetClient from "@/components/tools/image/contrast-matrix-sheet-client";

const TITLE = "Contrast Compliance Color Matrix Sheet Exporter | Toolzium";
const DESCRIPTION = "Test brand palette colors against each other for WCAG 2.1 AA/AAA accessibility compliance.";
const PATH = "/tools/image/contrast-matrix-sheet";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Contrast Compliance Color Matrix Sheet Exporter",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ContrastMatrixSheetClient />
    </>
  );
}
