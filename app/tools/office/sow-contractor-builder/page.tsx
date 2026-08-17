import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SowContractorBuilderClient from "@/components/tools/office/sow-contractor-builder-client";

const TITLE = "Independent Contractor SOW Builder | Toolzium";
const DESCRIPTION = "Generator for Independent Contractor Statements of Work (SOW) attached to Master Services Agreements.";
const PATH = "/tools/office/sow-contractor-builder";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Independent Contractor SOW Builder",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SowContractorBuilderClient />
    </>
  );
}
