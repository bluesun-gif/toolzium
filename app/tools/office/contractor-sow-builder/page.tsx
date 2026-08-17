import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ContractorSowBuilderClient from "@/components/tools/office/contractor-sow-builder-client";

const TITLE = "Contractor Scope of Work & Deliverables Builder | Toolzium";
const DESCRIPTION = "Generate formal Statement of Work (SOW) documents for independent contractors and freelancers.";
const PATH = "/tools/office/contractor-sow-builder";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Contractor Scope of Work & Deliverables Builder",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ContractorSowBuilderClient />
    </>
  );
}
