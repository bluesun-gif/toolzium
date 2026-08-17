import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiRiskMatrixClient from "@/components/tools/productivity/ai-risk-matrix-client";

const TITLE = "AI Project Risk & Assumption Matrix Auditor | Toolzium";
const DESCRIPTION = "Identify hidden project risks, technical debt, timeline bottlenecks, and mitigation plans with live AI.";
const PATH = "/tools/productivity/ai-risk-matrix";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Project Risk & Assumption Matrix Auditor",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AiRiskMatrixClient />
    </>
  );
}
