import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import JsonFormatterClient from "@/components/tools/dev/json-formatter-client";

const TITLE = "Json Formatter | Toolzium";
const DESCRIPTION = "Free online json formatter tool with instant calculation and privacy.";
const PATH = "/tools/dev/json-formatter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Json Formatter",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonFormatterClient />
    </>
  );
}
