import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AnimalQuizClient from "@/components/tools/fun/animal-quiz-client";

export const metadata = buildMetadata({
  title: "Animal Trivia Quiz | Toolzium",
  description: "Test your knowledge with a fun trivia quiz about animals across different categories.",
  path: "/tools/fun/animal-quiz",
  keywords: ["across", "different", "with", "your", "categories", "knowledge", "animals", "test", "about", "trivia", "quiz"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Animal Trivia Quiz",
    description: "Test your knowledge with a fun trivia quiz about animals across different categories.",
    path: "/tools/fun/animal-quiz",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <AnimalQuizClient />
    </div>
  );
}
