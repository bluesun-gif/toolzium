import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiRiskMatrixClient from "@/components/tools/productivity/ai-risk-matrix-client";

export const metadata = buildMetadata({
  title: "AI Project Risk & Assumption Matrix Auditor",
  description: "Identify hidden project risks, technical debt, timeline bottlenecks, and mitigation plans with live AI.",
  path: "/tools/productivity/ai-risk-matrix",
  keywords: ["technical", "identify", "debt", "with", "live", "hidden", "project", "risks", "timeline", "bottlenecks", "plans", "mitigation"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Project Risk & Assumption Matrix Auditor",
    description: "Identify hidden project risks, technical debt, timeline bottlenecks, and mitigation plans with live AI.",
    path: "/tools/productivity/ai-risk-matrix",
    categoryName: "Productivity",
    categoryPath: "/tools/productivity",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <AiRiskMatrixClient />
    </div>
  );
}
