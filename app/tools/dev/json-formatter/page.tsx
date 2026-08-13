import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import JSONFormatterClient from "@/components/tools/dev/json-formatter-client";

export const metadata = buildMetadata({
  title: "JSON Formatter",
  description: "Format, validate, and beautify JSON data online. JSON pretty printer with syntax highlighting, error detection, minify/compress options. Free JSON formatter and validator for developers.",
  path: "/tools/dev/json-formatter",
  keywords: ["data", "with", "format", "pretty", "online", "printer", "beautify", "validate", "syntax", "highlighting", "json"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "JSON Formatter",
    description: "Format, validate, and beautify JSON data online. JSON pretty printer with syntax highlighting, error detection, minify/compress options. Free JSON formatter and validator for developers.",
    path: "/tools/dev/json-formatter",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <JSONFormatterClient />
    </div>
  );
}
