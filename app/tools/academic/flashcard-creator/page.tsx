import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FlashcardCreatorClient from "@/components/tools/academic/flashcard-creator-client";

const TITLE = "AI Study Flashcard & Quiz Creator Studio | Toolzium";
const DESCRIPTION = "Convert lecture notes, textbook passages, and articles into instant Q&A flashcards and revision study cards using live AI.";
const PATH = "/tools/academic/flashcard-creator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Study Flashcard & Quiz Creator Studio",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <FlashcardCreatorClient />
    </>
  );
}
