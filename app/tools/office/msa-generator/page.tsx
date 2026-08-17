import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MSAGeneratorClient from "@/components/tools/office/msa-generator-client";

const TITLE = "Master Services Agreement (MSA) Generator | Toolzium";
const DESCRIPTION = "Generate formal Master Services Agreements (MSA) for corporate contracts & client retainers.";
const PATH = "/tools/office/msa-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Master Services Agreement (MSA) Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MSAGeneratorClient />
    </>
  );
}
