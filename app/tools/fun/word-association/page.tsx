import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WordAssociationClient from "@/components/tools/fun/word-association-client";

const TITLE = "Word Association Game | Toolzium";
const DESCRIPTION = "Play a word association chain game. Build chains of associated words, beat the timer, and share your longest chain.";
const PATH = "/tools/fun/word-association";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Word Association Game",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <WordAssociationClient />
    </>
  );
}
