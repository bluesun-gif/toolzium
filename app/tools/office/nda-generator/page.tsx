import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import NdaGeneratorClient from "@/components/tools/office/nda-generator-client";

const TITLE = "NDA Generator | Toolzium";
const DESCRIPTION = "Generate Non-Disclosure Agreements.";
const PATH = "/tools/office/nda-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "NDA Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <NdaGeneratorClient />
    </>
  );
}
