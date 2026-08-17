import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import HashGeneratorClient from "@/components/tools/dev/hash-generator-client";

const TITLE = "Hash Generator | Toolzium";
const DESCRIPTION = "Free online hash generator tool with instant calculation and privacy.";
const PATH = "/tools/dev/hash-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Hash Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <HashGeneratorClient />
    </>
  );
}
