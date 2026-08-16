import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import LoremIpsumClient from "@/components/tools/dev/lorem-ipsum-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
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
    
      <RelatedTools currentToolUrl="/tools/dev/lorem-ipsum" />
</div>
  );
}
