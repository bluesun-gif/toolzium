import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CssTransformClient from "@/components/tools/dev/css-transform-client";

const TITLE = "CSS 3D Transform Generator | Toolzium";
const DESCRIPTION = "Interactive 3D CSS transform generator with live preview.";
const PATH = "/tools/dev/css-transform";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "CSS 3D Transform Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CssTransformClient />
    </>
  );
}
