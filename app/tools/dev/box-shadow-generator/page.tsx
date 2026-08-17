import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BoxShadowGeneratorClient from "@/components/tools/dev/box-shadow-generator-client";

const TITLE = "Box Shadow Generator | Toolzium";
const DESCRIPTION = "Free online box shadow generator tool with instant calculation and privacy.";
const PATH = "/tools/dev/box-shadow-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Box Shadow Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <BoxShadowGeneratorClient />
    </>
  );
}
