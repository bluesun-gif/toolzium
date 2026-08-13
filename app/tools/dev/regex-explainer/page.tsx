import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RegexExplainerClient from "@/components/tools/dev/regex-explainer-client";

export const metadata = buildMetadata({
  title: "Regex Tester & AI Natural Language Explainer",
  description: "Test regular expressions against live sample strings and generate plain-English breakdowns of regex syntax with live AI inference.",
  path: "/tools/dev/regex-explainer",
  keywords: ["against", "english", "generate", "sample", "expressions", "strings", "test", "plain", "regex", "regular", "breakdowns", "live"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Regex Tester & AI Natural Language Explainer",
    description: "Test regular expressions against live sample strings and generate plain-English breakdowns of regex syntax with live AI inference.",
    path: "/tools/dev/regex-explainer",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <RegexExplainerClient />
    </div>
  );
}
