import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SqlToPrismaClient from "@/components/tools/dev/sql-to-prisma-client";

const TITLE = "SQL Table to Prisma Schema Converter Studio | Toolzium";
const DESCRIPTION = "Translate raw SQL CREATE TABLE statements into clean Prisma ORM models and schema definitions.";
const PATH = "/tools/dev/sql-to-prisma";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "SQL Table to Prisma Schema Converter Studio",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SqlToPrismaClient />
    </>
  );
}
