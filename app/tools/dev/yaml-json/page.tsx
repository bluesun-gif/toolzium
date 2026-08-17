import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import YamlJsonClient from "@/components/tools/dev/yaml-json-client";

const TITLE = "Yaml Json | Toolzium";
const DESCRIPTION = "Free online yaml json tool with instant calculation and privacy.";
const PATH = "/tools/dev/yaml-json";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Yaml Json",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <YamlJsonClient />
    </>
  );
}
