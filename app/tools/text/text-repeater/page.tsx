import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TextRepeaterClient from "@/components/tools/text/text-repeater-client";

const TITLE = "Text Repeater";
const DESCRIPTION = "Repeat any text or string multiple times with custom delimiters (new line, space, comma, custom). Copy or download repeated text instantly.";
const PATH = "/tools/text/text-repeater";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Text Repeater",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TextRepeaterClient />
    </>
  );
}
