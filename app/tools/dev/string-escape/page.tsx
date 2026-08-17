import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import StringEscapeClient from "@/components/tools/dev/string-escape-client";

const TITLE = "String Escape | Toolzium";
const DESCRIPTION = "Free online string escape tool with instant calculation and privacy.";
const PATH = "/tools/dev/string-escape";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "String Escape",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <StringEscapeClient />
    </>
  );
}
