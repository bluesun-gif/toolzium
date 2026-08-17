import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ColorPaletteClient from "@/components/tools/dev/color-palette-client";

const TITLE = "Color Palette | Toolzium";
const DESCRIPTION = "Free online color palette tool with instant calculation and privacy.";
const PATH = "/tools/dev/color-palette";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Color Palette",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ColorPaletteClient />
    </>
  );
}
