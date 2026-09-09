import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SqlRegexBuilderClient from "@/components/tools/ai/sql-regex-builder-client";

const TITLE = "Text to SQL & Regex Builder [Free] — Plain English to Code";
const DESCRIPTION =
  "✅ 100% free • No signup • Instant output • Describe what you need in plain English and get production-ready SQL queries and Regex with explanations.";
const PATH = "/tools/ai/sql-regex-builder";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "text to sql",
    "natural language sql",
    "regex builder",
    "sql generator",
    "ai regex",
  ],
});

const FAQS = [
  { question: "Is this SQL and Regex builder really free?",
    answer: "Yes, 100% free forever. No credit card, no signup, unlimited generations." },
  { question: "Do you store my queries or schema details?",
    answer: "No. Requests run without persistent storage — avoid pasting credentials or sensitive row data anyway." },
  { question: "Which databases and regex flavors?",
    answer: "MySQL, PostgreSQL, SQLite, SQL Server, and MongoDB query styles; regex compatible with JavaScript, Python, and PCRE flavors." },
  { question: "How reliable is generated code?",
    answer: "High for common patterns, and every output includes a line-by-line explanation so you can verify before running against real data." },
  ];

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Natural Language to SQL & Regex Builder",
    description: DESCRIPTION,
    path: PATH,
    faqs: FAQS,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SqlRegexBuilderClient />
    </>
  );
}
