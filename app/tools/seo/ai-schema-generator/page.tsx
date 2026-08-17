import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiSchemaGeneratorClient from "@/components/tools/seo/ai-schema-generator-client";

const TITLE = "AI Schema.org JSON-LD Structured Data Generator | Toolzium";
const DESCRIPTION = "Generate Google Rich Snippet JSON-LD structured data for Products, Local Businesses, Software, and FAQs with live AI.";
const PATH = "/tools/seo/ai-schema-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Schema.org JSON-LD Structured Data Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AiSchemaGeneratorClient />
    </>
  );
}
