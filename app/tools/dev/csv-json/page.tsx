import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CsvJsonClient from "@/components/tools/dev/csv-json-client";

export const metadata = buildMetadata({
  title: "CSV to JSON Converter",
  description: "Convert CSV files to JSON format with automatic header detection. Transform tabular data to JSON arrays or objects. Supports custom delimiters and bulk CSV processing.",
  path: "/tools/dev/csv-json",
  keywords: ["automatic", "data", "with", "format", "convert", "files", "detection", "header", "tabular", "transform", "json"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "CSV to JSON Converter",
    description: "Convert CSV files to JSON format with automatic header detection. Transform tabular data to JSON arrays or objects. Supports custom delimiters and bulk CSV processing.",
    path: "/tools/dev/csv-json",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <CsvJsonClient />
    </div>
  );
}
