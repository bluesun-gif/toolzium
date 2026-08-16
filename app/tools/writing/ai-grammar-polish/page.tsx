import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiGrammarPolishClient from "@/components/tools/writing/ai-grammar-polish-client";
export const metadata: Metadata = {
  title: "AI Grammar & Style Polish Studio | Toolzium",
  description:
    "Audit grammar errors, fix spelling mistakes, and polish style tone for emails, essays, and reports with live AI.",
};

export default function AiGrammarPolishPage() {
  return (
    <><AiGrammarPolishClient />
      <RelatedTools currentToolUrl="/tools/writing/ai-grammar-polish" />
    </>
  );
}
