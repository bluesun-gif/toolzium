import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import HangmanClient from "@/components/tools/fun/hangman-client";

const TITLE = "Hangman | Toolzium";
const DESCRIPTION = "Free online hangman tool with instant calculation and privacy.";
const PATH = "/tools/fun/hangman";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Hangman",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <HangmanClient />
    </>
  );
}
