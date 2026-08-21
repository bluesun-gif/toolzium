import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CsvJsonClient from "@/components/tools/dev/csv-json-client";

const TITLE = "Free CSV to JSON Converter Online - Convert CSV & TSV to JSON";
const DESCRIPTION =
  "Convert CSV data into clean, formatted JSON arrays and objects online. Auto-detects data types (numbers, booleans, nulls) and custom delimiters with instant copy and JSON export.";
const PATH = "/tools/dev/csv-json";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "csv to json",
    "convert csv to json",
    "csv to json converter",
    "tsv to json",
    "excel to json",
    "csv array to json",
    "free csv to json online",
  ],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Free CSV to JSON Converter Studio",
    description: DESCRIPTION,
    path: PATH,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CsvJsonClient />
    </>
  );
}
