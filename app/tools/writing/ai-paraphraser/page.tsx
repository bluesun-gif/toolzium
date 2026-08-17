import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiParaphraserClient from "@/components/tools/writing/ai-paraphraser-client";

const TITLE = "Ai Paraphraser | Toolzium";
const DESCRIPTION = "Free online ai paraphraser generator and assistant. Fast, private, and 100% free forever.";
const PATH = "/tools/writing/ai-paraphraser";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Ai Paraphraser",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AiParaphraserClient />
    </>
  );
}
