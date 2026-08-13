import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FlashcardCreatorClient from "@/components/tools/academic/flashcard-creator-client";

export const metadata = buildMetadata({
  title: "AI Study Flashcard & Quiz Creator Studio",
  description: "Convert lecture notes, textbook passages, and articles into instant Q&A flashcards and revision study cards using live AI.",
  path: "/tools/academic/flashcard-creator",
  keywords: ["instant", "into", "cards", "lecture", "convert", "flashcards", "notes", "articles", "passages", "study", "revision", "textbook"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Study Flashcard & Quiz Creator Studio",
    description: "Convert lecture notes, textbook passages, and articles into instant Q&A flashcards and revision study cards using live AI.",
    path: "/tools/academic/flashcard-creator",
    categoryName: "Academic",
    categoryPath: "/tools/academic",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <FlashcardCreatorClient />
    </div>
  );
}
