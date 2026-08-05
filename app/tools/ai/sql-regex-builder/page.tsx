import { Metadata } from "next";
import SqlRegexBuilderClient from "@/components/tools/ai/sql-regex-builder-client";
import { generateSEOMetadata } from "@/lib/seo-config";
import JsonLd from "@/components/seo/json-ld";

export const metadata: Metadata = generateSEOMetadata({
  title: "AI Natural Language to SQL & Regex Builder — Free Query Tool",
  description: "Convert plain English requirements into production-ready SQL queries and Regex expressions instantly with explanations.",
  path: "/tools/ai/sql-regex-builder",
});

export default function SqlRegexBuilderPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which SQL dialects are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Supports PostgreSQL, MySQL, SQLite, and Microsoft SQL Server (T-SQL).",
        },
      },
      {
        "@type": "Question",
        name: "Can I generate complex Regex patterns?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can describe any string validation logic (emails, URLs, phone numbers, custom formats) and get exact Regex tokens.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <SqlRegexBuilderClient />
    </>
  );
}
