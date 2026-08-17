import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ColorSwatchClient from "@/components/tools/image/color-swatch-client";

const TITLE = "Image Color Swatch Extractor | Toolzium";
const DESCRIPTION = "Extract prominent color palettes & swatches from any image.";
const PATH = "/tools/image/color-swatch";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Image Color Swatch Extractor",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ColorSwatchClient />
    </>
  );
}
