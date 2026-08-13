import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SqlToPrismaClient from "@/components/tools/dev/sql-to-prisma-client";

export const metadata = buildMetadata({
  title: "SQL Table to Prisma Schema Converter Studio",
  description: "Translate raw SQL CREATE TABLE statements into clean Prisma ORM models and schema definitions.",
  path: "/tools/dev/sql-to-prisma",
  keywords: ["table", "into", "translate", "prisma", "create", "clean", "models", "definitions", "statements", "schema"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "SQL Table to Prisma Schema Converter Studio",
    description: "Translate raw SQL CREATE TABLE statements into clean Prisma ORM models and schema definitions.",
    path: "/tools/dev/sql-to-prisma",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <SqlToPrismaClient />
    </div>
  );
}
