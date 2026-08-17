import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CitationGeneratorClient from "@/components/tools/academic/citation-generator-client";

const TITLE = "Citation Generator | Toolzium";
const DESCRIPTION = "Free online citation generator tool with instant calculation and privacy.";
const PATH = "/tools/academic/citation-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Citation Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CitationGeneratorClient />
    </>
  );
}
