import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiContractorAgreementClient from "@/components/tools/office/ai-contractor-agreement-client";

const TITLE = "AI Independent Contractor Agreement Studio";
const DESCRIPTION = "Draft custom contractor agreements, IP work-for-hire clauses, payment terms, and confidentiality terms powered by live AI.";
const PATH = "/tools/office/ai-contractor-agreement";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Independent Contractor Agreement Studio",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AiContractorAgreementClient />
    </>
  );
}
