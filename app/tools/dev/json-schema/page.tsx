import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import JsonSchemaClient from "@/components/tools/dev/json-schema-client";

const TITLE = "JSON Schema Validator | Toolzium";
const DESCRIPTION = "Validate JSON data against a JSON Schema instantly. Real-time validation, formatting, and helpful error messages.";
const PATH = "/tools/dev/json-schema";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "JSON Schema Validator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonSchemaClient />
    </>
  );
}
