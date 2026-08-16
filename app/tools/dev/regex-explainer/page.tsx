import { Metadata } from "next";
import RegexExplainerClient from "@/components/tools/dev/regex-explainer-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = {
  title: "Regex Tester & AI Natural Language Explainer | Toolzium",
  description:
    "Test regular expressions against live sample strings and generate plain-English breakdowns of regex syntax with live AI inference.",
};

export default function RegexExplainerPage() {
  return (
    <><RegexExplainerClient />
      <RelatedTools currentToolUrl="/tools/dev/regex-explainer" />
    </>
  );
}
