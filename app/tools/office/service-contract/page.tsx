import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ServiceContractClient from "@/components/tools/office/service-contract-client";

const TITLE = "Professional Service Contract Generator | Toolzium";
const DESCRIPTION = "Generate formal Professional Service Contracts & Independent Contractor Agreements quickly and easily.";
const PATH = "/tools/office/service-contract";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Professional Service Contract Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ServiceContractClient />
    </>
  );
}
