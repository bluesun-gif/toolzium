import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PixelArtClient from "@/components/tools/image/pixel-art-client";

const TITLE = "Pixel Art Creator | Toolzium";
const DESCRIPTION = "Draw and create your own pixel art online. Export high-quality PNGs with custom palettes and grid sizes.";
const PATH = "/tools/image/pixel-art";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Pixel Art Creator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PixelArtClient />
    </>
  );
}
