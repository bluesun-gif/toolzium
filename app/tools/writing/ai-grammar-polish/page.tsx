import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiGrammarPolishClient from "@/components/tools/writing/ai-grammar-polish-client";

export const metadata = buildMetadata({
  title: "AI Grammar & Style Polish Studio",
  description: "Audit grammar errors, fix spelling mistakes, and polish style tone for emails, essays, and reports with live AI.",
  path: "/tools/writing/ai-grammar-polish",
  keywords: ["mistakes", "tone", "emails", "spelling", "style", "with", "reports", "audit", "grammar", "polish", "errors", "essays"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Grammar & Style Polish Studio",
    description: "Audit grammar errors, fix spelling mistakes, and polish style tone for emails, essays, and reports with live AI.",
    path: "/tools/writing/ai-grammar-polish",
    categoryName: "Writing",
    categoryPath: "/tools/writing",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <AiGrammarPolishClient />
    </div>
  );
}
