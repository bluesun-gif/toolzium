import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CharacterCounterClient from "@/components/tools/text/character-counter-client";

const TITLE = "Character Counter — Count Letters & Words Online";
const DESCRIPTION = "Count characters, words, sentences, paragraphs in real-time. Check social media limits for Twitter/X, Instagram, LinkedIn, TikTok. Free character counter tool.";
const PATH = "/tools/text/character-counter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Character Counter",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CharacterCounterClient />
    </>
  );
}
