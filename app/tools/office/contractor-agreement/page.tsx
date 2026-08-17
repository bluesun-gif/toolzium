import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ContractorAgreementClient from "@/components/tools/office/contractor-agreement-client";

const TITLE = "Independent Contractor Agreement Builder | Toolzium";
const DESCRIPTION = "Generate formal Independent Contractor & Freelance Agreements easily.";
const PATH = "/tools/office/contractor-agreement";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Independent Contractor Agreement Builder",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ContractorAgreementClient />
    </>
  );
}
