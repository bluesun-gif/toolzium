import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiContractorAgreementClient from "@/components/tools/office/ai-contractor-agreement-client";

export const metadata = buildMetadata({
  title: "AI Independent Contractor Agreement Studio",
  description: "Draft custom contractor agreements, IP work-for-hire clauses, payment terms, and confidentiality terms powered by live AI.",
  path: "/tools/office/ai-contractor-agreement",
  keywords: ["contractor", "terms", "powered", "payment", "draft", "agreements", "confidentiality", "work", "custom", "hire", "clauses"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Independent Contractor Agreement Studio",
    description: "Draft custom contractor agreements, IP work-for-hire clauses, payment terms, and confidentiality terms powered by live AI.",
    path: "/tools/office/ai-contractor-agreement",
    categoryName: "Office",
    categoryPath: "/tools/office",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <AiContractorAgreementClient />
    </div>
  );
}
