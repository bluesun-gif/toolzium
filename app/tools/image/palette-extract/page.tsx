import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PaletteExtractClient from "@/components/tools/image/palette-extract-client";

const TITLE = "Color Palette from Image | Toolzium";
const DESCRIPTION = "Extract beautiful color palettes from any image. Get hex, RGB, and HSL values instantly for your design projects.";
const PATH = "/tools/image/palette-extract";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Color Palette from Image",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PaletteExtractClient />
    </>
  );
}
