import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ContrastMatrixExportClient from "@/components/tools/image/contrast-matrix-export-client";

const TITLE = "Color Contrast Matrix Exporter | Toolzium";
const DESCRIPTION = "Generate accessible design system color contrast matrices. Check WCAG AA/AAA compliance for your palette.";
const PATH = "/tools/image/contrast-matrix-export";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Color Contrast Matrix Exporter",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ContrastMatrixExportClient />
    </>
  );
}
