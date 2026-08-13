import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiSowGeneratorClient from "@/components/tools/office/ai-sow-generator-client";

export const metadata = buildMetadata({
  title: "AI Statement of Work (SOW) Deliverables Generator",
  description: "Generate professional client Statement of Work (SOW) documents with phased milestone deliverables, acceptance criteria, and out-of-scope boundaries using live AI.",
  path: "/tools/office/ai-sow-generator",
  keywords: ["client", "acceptance", "with", "statement", "professional", "generate", "deliverables", "criteria", "milestone", "work", "phased", "documents"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Statement of Work (SOW) Deliverables Generator",
    description: "Generate professional client Statement of Work (SOW) documents with phased milestone deliverables, acceptance criteria, and out-of-scope boundaries using live AI.",
    path: "/tools/office/ai-sow-generator",
    categoryName: "Office",
    categoryPath: "/tools/office",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <AiSowGeneratorClient />
    </div>
  );
}
