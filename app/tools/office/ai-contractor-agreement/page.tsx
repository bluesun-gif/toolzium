import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiContractorAgreementClient from "@/components/tools/office/ai-contractor-agreement-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "AI Independent Contractor Agreement Studio",
  description: "Draft custom contractor agreements, IP work-for-hire clauses, payment terms, and confidentiality terms powered by live AI.",
  path: "/tools/office/ai-contractor-agreement",
  keywords: ["contractor", "terms", "powered", "payment", "draft", "agreements", "confidentiality", "work", "custom", "hire", "clauses"],
});

export default function AiContractorAgreementPage() {
  return (
    <><AiContractorAgreementClient />
      <RelatedTools currentToolUrl="/tools/office/ai-contractor-agreement" />
    </>
  );
}
