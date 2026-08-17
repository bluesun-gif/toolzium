import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ColorHarmonyClient from "@/components/tools/image/color-harmony-client";

const TITLE = "Color Palette Harmonizer & Generator | Toolzium";
const DESCRIPTION = "Generate color harmony palettes based on color theory.";
const PATH = "/tools/image/color-harmony";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Color Palette Harmonizer & Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ColorHarmonyClient />
    </>
  );
}
