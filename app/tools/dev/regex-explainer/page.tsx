import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RegexExplainerClient from "@/components/tools/dev/regex-explainer-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Regex Tester & AI Natural Language Explainer",
  description: "Test regular expressions against live sample strings and generate plain-English breakdowns of regex syntax with live AI inference.",
  path: "/tools/dev/regex-explainer",
  keywords: ["against", "english", "generate", "sample", "expressions", "strings", "test", "plain", "regex", "regular", "breakdowns", "live"],
});

export default function RegexExplainerPage() {
  return (
    <><RegexExplainerClient />
      <RelatedTools currentToolUrl="/tools/dev/regex-explainer" />
    </>
  );
}
