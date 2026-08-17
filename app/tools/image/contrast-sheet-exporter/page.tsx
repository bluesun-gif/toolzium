import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ContrastSheetExporterClient from "@/components/tools/image/contrast-sheet-exporter-client";

const TITLE = "Color Palette Contrast Sheet Exporter | Toolzium";
const DESCRIPTION = "Generate and export WCAG 2.1 design system color contrast sheets.";
const PATH = "/tools/image/contrast-sheet-exporter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Color Palette Contrast Sheet Exporter",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ContrastSheetExporterClient />
    </>
  );
}
