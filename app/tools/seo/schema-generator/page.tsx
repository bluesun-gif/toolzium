import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SchemaGeneratorClient from "@/components/tools/seo/schema-generator-client";

const TITLE = "Schema Generator | Toolzium";
const DESCRIPTION = "Free online schema generator tool with instant calculation and privacy.";
const PATH = "/tools/seo/schema-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Schema Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SchemaGeneratorClient />
    </>
  );
}
