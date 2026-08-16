import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiSowGeneratorClient from "@/components/tools/office/ai-sow-generator-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "AI Statement of Work (SOW) Deliverables Generator",
  description: "Generate professional client Statement of Work (SOW) documents with phased milestone deliverables, acceptance criteria, and out-of-scope boundaries using live AI.",
  path: "/tools/office/ai-sow-generator",
  keywords: ["client", "acceptance", "with", "statement", "professional", "generate", "deliverables", "criteria", "milestone", "work", "phased", "documents"],
});

export default function AiSowGeneratorPage() {
  return (
    <><AiSowGeneratorClient />
      <RelatedTools currentToolUrl="/tools/office/ai-sow-generator" />
    </>
  );
}
