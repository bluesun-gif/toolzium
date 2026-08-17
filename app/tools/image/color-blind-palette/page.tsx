import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ColorBlindPaletteClient from "@/components/tools/image/color-blind-palette-client";

const TITLE = "Color Blindness Palette | Toolzium";
const DESCRIPTION = "Generate and test color palettes for accessibility and different types of color vision deficiencies.";
const PATH = "/tools/image/color-blind-palette";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Color Blindness Palette",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ColorBlindPaletteClient />
    </>
  );
}
