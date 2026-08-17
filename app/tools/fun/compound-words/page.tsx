import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CompoundWordsClient from "@/components/tools/fun/compound-words-client";

const TITLE = "Compound Words | Toolzium";
const DESCRIPTION = "Free online compound words tool with instant calculation and privacy.";
const PATH = "/tools/fun/compound-words";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Compound Words",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CompoundWordsClient />
    </>
  );
}
