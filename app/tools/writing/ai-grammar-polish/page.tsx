import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiGrammarPolishClient from "@/components/tools/writing/ai-grammar-polish-client";

const TITLE = "Ai Grammar Polish | Toolzium";
const DESCRIPTION = "Free online ai grammar polish generator and assistant. Fast, private, and 100% free forever.";
const PATH = "/tools/writing/ai-grammar-polish";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Ai Grammar Polish",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AiGrammarPolishClient />
    </>
  );
}
