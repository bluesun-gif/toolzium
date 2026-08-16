import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WordCounterClient from "@/components/tools/text/word-counter-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "Word Counter",
  description: "Count words, characters, sentences, paragraphs, and reading time instantly. Free online word counter with character count, keyword density, and readability analysis. Perfect for writers, students, and SEO.",
  path: "/tools/text/word-counter",
  keywords: ["words", "time", "characters", "reading", "free", "online", "count", "instantly", "word", "paragraphs", "counter", "sentences"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Word Counter",
    description: "Count words, characters, sentences, paragraphs, and reading time instantly. Free online word counter with character count, keyword density, and readability analysis. Perfect for writers, students, and SEO.",
    path: "/tools/text/word-counter",
    categoryName: "Text",
    categoryPath: "/tools/text",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <WordCounterClient />
    
      <RelatedTools currentToolUrl="/tools/text/word-counter" />
</div>
  );
}
