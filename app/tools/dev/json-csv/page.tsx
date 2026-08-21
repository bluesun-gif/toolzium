import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import JsonCsvClient from "@/components/tools/dev/json-csv-client";

const TITLE = "Free JSON to CSV Converter Online - Convert JSON Array to CSV & Excel";
const DESCRIPTION =
  "Convert JSON data to CSV format online for free. Automatically flattens nested JSON objects, supports custom delimiters (comma, semicolon, tab, pipe), and exports ready-to-use CSV files.";
const PATH = "/tools/dev/json-csv";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "json to csv",
    "convert json to csv",
    "json to excel",
    "json to csv converter",
    "flatten json to csv",
    "json array to csv",
    "export json to csv",
    "free json to csv converter online",
  ],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Free JSON to CSV Converter Studio",
    description: DESCRIPTION,
    path: PATH,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonCsvClient />
    </>
  );
}
