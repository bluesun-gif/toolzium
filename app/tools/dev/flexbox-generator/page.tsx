import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FlexboxGeneratorClient from "@/components/tools/dev/flexbox-generator-client";

const TITLE = "CSS Flexbox Layout Generator | Toolzium";
const DESCRIPTION = "Visually generate and customize CSS Flexbox layouts with interactive controls and instant code generation.";
const PATH = "/tools/dev/flexbox-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "CSS Flexbox Layout Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <FlexboxGeneratorClient />
    </>
  );
}
