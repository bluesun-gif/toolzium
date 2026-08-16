import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiGrammarPolishClient from "@/components/tools/writing/ai-grammar-polish-client";
<<<<<<< HEAD
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
=======

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
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
