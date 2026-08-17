import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import NameGeneratorClient from "@/components/tools/fun/name-generator-client";

const TITLE = "Name Generator | Toolzium";
const DESCRIPTION = "Free online name generator tool with instant calculation and privacy.";
const PATH = "/tools/fun/name-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Name Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <NameGeneratorClient />
    </>
  );
}
