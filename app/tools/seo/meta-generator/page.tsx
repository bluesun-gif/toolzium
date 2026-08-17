import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MetaGeneratorClient from "@/components/tools/seo/meta-generator-client";

const TITLE = "Meta Generator | Toolzium";
const DESCRIPTION = "Free online meta generator tool with instant calculation and privacy.";
const PATH = "/tools/seo/meta-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Meta Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MetaGeneratorClient />
    </>
  );
}
