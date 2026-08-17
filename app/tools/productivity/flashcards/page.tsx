import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FlashcardMakerClient from "@/components/tools/productivity/flashcards-client";

const TITLE = "Flashcard Maker | Toolzium";
const DESCRIPTION = "Create, study, and manage your custom flashcard decks for effective learning and memorization.";
const PATH = "/tools/productivity/flashcards";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Flashcard Maker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <FlashcardMakerClient />
    </>
  );
}
