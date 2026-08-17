import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import IdGeneratorClient from "@/components/tools/util/id-generator-client";

const TITLE = "Id Generator | Toolzium";
const DESCRIPTION = "Free online id generator tool with instant calculation and privacy.";
const PATH = "/tools/util/id-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Id Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <IdGeneratorClient />
    </>
  );
}
