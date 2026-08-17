import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ColorExtractorClient from "@/components/tools/image/color-extractor-client";

const TITLE = "Image Color Extractor | Toolzium";
const DESCRIPTION = "Extract dominant colors and create beautiful palettes from any image.";
const PATH = "/tools/image/color-extractor";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Image Color Extractor",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ColorExtractorClient />
    </>
  );
}
