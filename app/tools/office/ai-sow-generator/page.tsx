import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiSowGeneratorClient from "@/components/tools/office/ai-sow-generator-client";

const TITLE = "AI Statement of Work (SOW) Deliverables Generator";
const DESCRIPTION = "Generate professional client Statement of Work (SOW) documents with phased milestone deliverables, acceptance criteria, and out-of-scope boundaries using live AI.";
const PATH = "/tools/office/ai-sow-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Statement of Work (SOW) Deliverables Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AiSowGeneratorClient />
    </>
  );
}
