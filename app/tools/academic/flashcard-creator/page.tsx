import { Metadata } from "next";
import FlashcardCreatorClient from "@/components/tools/academic/flashcard-creator-client";

export const metadata: Metadata = {
  title: "AI Study Flashcard & Quiz Creator Studio | Toolzium",
  description:
    "Convert lecture notes, textbook passages, and articles into instant Q&A flashcards and revision study cards using live AI.",
};

export default function FlashcardCreatorPage() {
  return <FlashcardCreatorClient />;
}
