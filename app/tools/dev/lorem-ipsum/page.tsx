import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import LoremIpsumClient from "@/components/tools/dev/lorem-ipsum-client";

export const metadata = buildMetadata({
  title: "Lorem Ipsum Generator",
  description: "Generate Lorem Ipsum placeholder text for design mockups and testing. Create paragraphs, sentences, or words of dummy text. Lorem Ipsum generator with word count control.",
  path: "/tools/dev/lorem-ipsum",
  keywords: ["design", "words", "generate", "paragraphs", "sentences", "create", "lorem", "testing", "text", "ipsum", "mockups", "placeholder"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Lorem Ipsum Generator",
    description: "Generate Lorem Ipsum placeholder text for design mockups and testing. Create paragraphs, sentences, or words of dummy text. Lorem Ipsum generator with word count control.",
    path: "/tools/dev/lorem-ipsum",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <LoremIpsumClient />
    </div>
  );
}
