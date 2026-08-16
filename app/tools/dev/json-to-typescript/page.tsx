import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import JsonToTypescriptClient from "@/components/tools/dev/json-to-typescript-client";
export const metadata: Metadata = {
  title: "JSON to TypeScript Type & Interface Converter Studio | Toolzium",
  description:
    "Convert raw JSON objects instantly into clean, nested TypeScript interfaces and type definitions.",
};

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <JsonToTypescriptClient />
    
      <RelatedTools currentToolUrl="/tools/dev/json-to-typescript" />
</div>
  );
}
