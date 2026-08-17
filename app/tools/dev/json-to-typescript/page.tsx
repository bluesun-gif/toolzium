import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import JsonToTypescriptClient from "@/components/tools/dev/json-to-typescript-client";

const TITLE = "Json To Typescript | Toolzium";
const DESCRIPTION = "Free online json to typescript tool with instant calculation and privacy.";
const PATH = "/tools/dev/json-to-typescript";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Json To Typescript",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonToTypescriptClient />
    </>
  );
}
