import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RegexExplainerClient from "@/components/tools/dev/regex-explainer-client";

const TITLE = "Regex Tester & AI Natural Language Explainer";
const DESCRIPTION = "Test regular expressions against live sample strings and generate plain-English breakdowns of regex syntax with live AI inference.";
const PATH = "/tools/dev/regex-explainer";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Regex Tester & AI Natural Language Explainer",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <RegexExplainerClient />
    </>
  );
}
