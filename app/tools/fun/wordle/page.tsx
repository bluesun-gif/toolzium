import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WordleClient from "@/components/tools/fun/wordle-client";

const TITLE = "Word Guess Game | Toolzium";
const DESCRIPTION = "Play a 5-letter word guessing game. Test your vocabulary and logic skills.";
const PATH = "/tools/fun/wordle";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Word Guess Game",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <WordleClient />
    </>
  );
}
