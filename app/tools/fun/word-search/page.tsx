import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WordSearchClient from "@/components/tools/fun/word-search-client";

const TITLE = "Word Search | Toolzium";
const DESCRIPTION = "Free online word search tool with instant calculation and privacy.";
const PATH = "/tools/fun/word-search";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Word Search",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <WordSearchClient />
    </>
  );
}
