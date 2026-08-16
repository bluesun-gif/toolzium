import { buildMetadata } from "@/lib/seo"
import { siteURL } from "@/lib/constants"
import JsonLd from "@/components/seo/json-ld"
import JsonCsvClient from "@/components/tools/dev/json-csv-client"
export const metadata = buildMetadata({
  title: "JSON to CSV Converter",
  description: "Convert JSON arrays to CSV format instantly. Choose delimiters, flatten nested objects, download CSV files. Free online JSON to CSV converter — no signup.",
  path: "/tools/dev/json-csv",
  keywords: ["download", "flatten", "format", "objects", "convert", "files", "delimiters", "instantly", "arrays", "choose", "nested", "json"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "JSON to CSV Converter",
    description: "Convert JSON arrays to CSV format instantly. Choose delimiters, flatten nested objects, download CSV files. Free online JSON to CSV converter — no signup.",
    path: "/tools/dev/json-csv",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <JsonCsvClient />
    
      <RelatedTools currentToolUrl="/tools/dev/json-csv" />
</>
  )
}
