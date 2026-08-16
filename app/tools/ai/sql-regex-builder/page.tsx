import { Metadata } from "next";
import SqlRegexBuilderClient from "@/components/tools/ai/sql-regex-builder-client";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import JsonLd from "@/components/seo/json-ld";
const TITLE = "AI Natural Language to SQL & Regex Builder — Free Query Tool | Toolzium";
const DESCRIPTION =
  "Convert plain English requirements into production-ready SQL queries and Regex expressions instantly with explanations.";
const PATH = "/tools/ai/sql-regex-builder";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "AI SQL generator",
    "text to SQL query",
    "Regex generator online",
    "PostgreSQL query builder",
    "regular expression builder",
    "SQL assistant",
  ],
});

export default function SqlRegexBuilderPage() {
  const jsonLdData = buildToolJsonLd({
    name: "AI SQL & Regex Builder",
    description: DESCRIPTION,
    path: PATH,
    categoryName: "AI Tools",
    categoryPath: "/tools/ai",
    faqs: [
      {
        question: "Which SQL dialects are supported?",
        answer: "Supports PostgreSQL, MySQL, SQLite, and Microsoft SQL Server (T-SQL).",
      },
      {
        question: "Can I generate complex Regex patterns?",
        answer:
          "Yes, you can describe any string validation logic (emails, URLs, phone numbers, custom formats) and get exact Regex tokens.",
      },
    ],
  });

  return (
    <>
      <JsonLd data={jsonLdData as any} />
      <SqlRegexBuilderClient />
    
      <RelatedTools currentToolUrl="/tools/ai/sql-regex-builder" />
</>
  );
}
