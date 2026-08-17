import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CssTransform2dClient from "@/components/tools/dev/css-transform-2d-client";

const TITLE = "CSS 2D Transform Matrix & Style Generator | Toolzium";
const DESCRIPTION = "Visually generate CSS 2D transforms and transform-origin properties with interactive live preview. Sliders for translate, scale, rotate, and skew.";
const PATH = "/tools/dev/css-transform-2d";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "CSS 2D Transform Matrix & Style Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CssTransform2dClient />
    </>
  );
}
