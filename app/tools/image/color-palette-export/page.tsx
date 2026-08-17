import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ColorPaletteExportClient from "@/components/tools/image/color-palette-export-client";

const TITLE = "Color Palette Exporter | Toolzium";
const DESCRIPTION = "Create custom color palettes and export as SVG, CSS, Tailwind config, or JSON.";
const PATH = "/tools/image/color-palette-export";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Color Palette Exporter",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ColorPaletteExportClient />
    </>
  );
}
