import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BolGeneratorClient from "@/components/tools/office/bol-generator-client";

const TITLE = "Bill of Lading (BOL) Generator | Toolzium";
const DESCRIPTION = "Generate official Bill of Lading (BOL) logistics shipping documents.";
const PATH = "/tools/office/bol-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Bill of Lading (BOL) Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <BolGeneratorClient />
    </>
  );
}
