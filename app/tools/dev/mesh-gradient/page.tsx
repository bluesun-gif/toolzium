import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MeshGradientClient from "@/components/tools/dev/mesh-gradient-client";

const TITLE = "Mesh Gradient | Toolzium";
const DESCRIPTION = "Free online mesh gradient tool with instant calculation and privacy.";
const PATH = "/tools/dev/mesh-gradient";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Mesh Gradient",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MeshGradientClient />
    </>
  );
}
