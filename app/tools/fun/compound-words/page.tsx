import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CompoundWordsClient from "@/components/tools/fun/compound-words-client";

export const metadata = buildMetadata({
  title: "Compound Words Game | Toolzium",
  description: "Test your vocabulary with this fun compound words puzzle game.",
  path: "/tools/fun/compound-words",
  keywords: ["compound", "with", "your", "puzzle", "test", "words", "game", "this", "vocabulary"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Compound Words Game",
    description: "Test your vocabulary with this fun compound words puzzle game.",
    path: "/tools/fun/compound-words",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <CompoundWordsClient />
    </div>
  );
}
