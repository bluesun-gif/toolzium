import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WordCounterClient from "@/components/tools/text/word-counter-client";

const TITLE = "Word Counter [Free] — Characters, Sentences, Reading Time Live";
const DESCRIPTION =
  "✅ 100% free • Real-time counting • No signup • Count words, characters, sentences, paragraphs & reading time. Perfect for essays, tweets, and SEO limits.";
const PATH = "/tools/text/word-counter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "word counter",
    "character count",
    "reading time calculator",
    "essay word counter",
    "count words online",
  ],
});

const FAQS = [
  { question: "Is this word counter really free?",
    answer: "Yes, 100% free forever. No credit card, no signup, unlimited counting." },
  { question: "Do you store my text?",
    answer: "No. All counting runs client-side in your browser. We never log your documents." },
  { question: "What statistics does it provide?",
    answer: "Words, characters (with and without spaces), sentences, paragraphs, estimated reading and speaking time, and keyword frequency." },
  { question: "How accurate and fast are the results?",
    answer: "Live updates as you type, with sub-millisecond counting even for 100k+ word manuscripts." },
  ];

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Word Counter & Text Analyzer",
    description: DESCRIPTION,
    path: PATH,
    faqs: FAQS,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <WordCounterClient />
    </>
  );
}
