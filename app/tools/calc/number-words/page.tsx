import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import NumberWordsClient from "@/components/tools/calc/number-words-client";

const TITLE = "Number Words | Toolzium";
const DESCRIPTION = "Free online number words tool with instant calculation and privacy.";
const PATH = "/tools/calc/number-words";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Number Words",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <NumberWordsClient />
    </>
  );
}
