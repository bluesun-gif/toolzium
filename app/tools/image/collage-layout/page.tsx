import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CollageLayoutClient from "@/components/tools/image/collage-layout-client";

const TITLE = "Photo Collage Layout | Toolzium";
const DESCRIPTION = "Design photo collage layouts visually.";
const PATH = "/tools/image/collage-layout";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Photo Collage Layout",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CollageLayoutClient />
    </>
  );
}
