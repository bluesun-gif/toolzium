import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import YamlJsonClient from "@/components/tools/dev/yaml-json-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "YAML to JSON Converter",
  description: "Convert YAML to JSON and JSON to YAML online. YAML parser and converter with syntax validation and formatting. Perfect for configuration files and data transformation.",
  path: "/tools/dev/yaml-json",
  keywords: ["yaml", "with", "validation", "convert", "online", "converter", "syntax", "parser", "json"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "YAML to JSON Converter",
    description: "Convert YAML to JSON and JSON to YAML online. YAML parser and converter with syntax validation and formatting. Perfect for configuration files and data transformation.",
    path: "/tools/dev/yaml-json",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <YamlJsonClient />
    
      <RelatedTools currentToolUrl="/tools/dev/yaml-json" />
</div>
  );
}
