import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ContractTemplateClient from "@/components/tools/office/contract-template-client";

const TITLE = "Contract Template Generator | Toolzium";
const DESCRIPTION = "Generate basic contract templates for various needs.";
const PATH = "/tools/office/contract-template";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Contract Template Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ContractTemplateClient />
    </>
  );
}
