import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import Wordle6LetterClient from "@/components/tools/fun/wordle-6letter-client";

const TITLE = "6-Letter Wordle Challenge Game | Toolzium";
const DESCRIPTION = "Play the 6-letter Wordle puzzle challenge game. 6 attempts to guess a secret 6-letter word with color feedback.";
const PATH = "/tools/fun/wordle-6letter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "6-Letter Wordle Challenge Game",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <Wordle6LetterClient />
    </>
  );
}
