import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import NdaBuilderClient from "@/components/tools/office/nda-builder-client";

const TITLE = "Mutual NDA Generator | Toolzium";
const DESCRIPTION = "Generate formal Mutual or One-Way Non-Disclosure Agreements.";
const PATH = "/tools/office/nda-builder";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Mutual NDA Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <NdaBuilderClient />
    </>
  );
}
