import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WordScrambleClient from "@/components/tools/fun/word-scramble-client";

const TITLE = "Word Scramble | Toolzium";
const DESCRIPTION = "Free online word scramble tool with instant calculation and privacy.";
const PATH = "/tools/fun/word-scramble";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Word Scramble",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <WordScrambleClient />
    </>
  );
}
