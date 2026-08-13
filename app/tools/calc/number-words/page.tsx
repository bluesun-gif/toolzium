import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import NumberWordsClient from "@/components/tools/calc/number-words-client";

export const metadata = buildMetadata({
  title: "Number to Words",
  description: "Convert numbers to words and back. Supports up to 999 billion. Currency mode (USD, EUR, GBP, INR). Ordinal numbers. Copy results.",
  path: "/tools/calc/number-words",
  keywords: ["mode", "numbers", "ordinal", "results", "convert", "billion", "copy", "currency", "words", "supports", "back"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Number to Words",
    description: "Convert numbers to words and back. Supports up to 999 billion. Currency mode (USD, EUR, GBP, INR). Ordinal numbers. Copy results.",
    path: "/tools/calc/number-words",
    categoryName: "Calc",
    categoryPath: "/tools/calc",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <NumberWordsClient />
    </div>
  );
}
