import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SqlRegexBuilderClient from "@/components/tools/ai/sql-regex-builder-client";

const TITLE = "AI Natural Language to SQL & Regex Builder — Free Query Tool | Toolzium";
const DESCRIPTION = "Convert plain English requirements into production-ready SQL queries and Regex expressions instantly with explanations.";
const PATH = "/tools/ai/sql-regex-builder";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Natural Language to SQL & Regex Builder",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SqlRegexBuilderClient />
    </>
  );
}
