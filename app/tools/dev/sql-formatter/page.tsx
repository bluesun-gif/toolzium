import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SqlFormatterClient from "@/components/tools/dev/sql-formatter-client";

const TITLE = "SQL Formatter | Toolzium";
const DESCRIPTION = "Format and beautify your SQL queries online.";
const PATH = "/tools/dev/sql-formatter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "SQL Formatter",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SqlFormatterClient />
    </>
  );
}
