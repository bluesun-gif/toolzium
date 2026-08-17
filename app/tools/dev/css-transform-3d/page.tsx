import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CssTransform3dClient from "@/components/tools/dev/css-transform-3d-client";

const TITLE = "CSS 3D Transform Generator | Toolzium";
const DESCRIPTION = "Interactive visual 3D CSS transform & perspective generator.";
const PATH = "/tools/dev/css-transform-3d";

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
      <CssTransform3dClient />
    </>
  );
}
