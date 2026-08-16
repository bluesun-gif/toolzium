import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiRiskMatrixClient from "@/components/tools/productivity/ai-risk-matrix-client";
export const metadata: Metadata = {
  title: "AI Project Risk & Assumption Matrix Auditor | Toolzium",
  description:
    "Identify hidden project risks, technical debt, timeline bottlenecks, and mitigation plans with live AI.",
};

export default function AiRiskMatrixPage() {
  return (
    <><AiRiskMatrixClient />
      <RelatedTools currentToolUrl="/tools/productivity/ai-risk-matrix" />
    </>
  );
}
