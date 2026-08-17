import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import LoremIpsumClient from "@/components/tools/text/lorem-ipsum-client";

const TITLE = "Lorem Ipsum Generator — Free Placeholder Dummy Text | Toolzium";
const DESCRIPTION = "Generate custom Lorem Ipsum placeholder text by paragraphs, words, sentences, or lists. Includes HTML markup tag options, copy to clipboard, and instant preview. 100% free.";
const PATH = "/tools/text/lorem-ipsum";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Lorem Ipsum Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <LoremIpsumClient />
    </>
  );
}
