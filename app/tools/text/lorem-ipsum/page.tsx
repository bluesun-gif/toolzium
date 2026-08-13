import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import LoremIpsumClient from "@/components/tools/text/lorem-ipsum-client";

export const metadata = buildMetadata({
  title: "Lorem Ipsum Generator — Free Placeholder Dummy Text | Toolzium",
  description: "Generate custom Lorem Ipsum placeholder text by paragraphs, words, sentences, or lists. Includes HTML markup tag options, copy to clipboard, and instant preview. 100% free.",
  path: "/tools/text/lorem-ipsum",
  keywords: ["words", "lists", "generate", "sentences", "includes", "lorem", "html", "custom", "paragraphs", "text", "ipsum", "placeholder"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Lorem Ipsum Generator — Free Placeholder Dummy Text",
    description: "Generate custom Lorem Ipsum placeholder text by paragraphs, words, sentences, or lists. Includes HTML markup tag options, copy to clipboard, and instant preview. 100% free.",
    path: "/tools/text/lorem-ipsum",
    categoryName: "Text",
    categoryPath: "/tools/text",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <LoremIpsumClient />
    </div>
  );
}
