import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import JsonToTypescriptClient from "@/components/tools/dev/json-to-typescript-client";
<<<<<<< HEAD
export const metadata: Metadata = {
  title: "JSON to TypeScript Type & Interface Converter Studio | Toolzium",
  description:
    "Convert raw JSON objects instantly into clean, nested TypeScript interfaces and type definitions.",
};
=======

export const metadata = buildMetadata({
  title: "JSON to TypeScript Type & Interface Converter",
  description: "Convert raw JSON objects instantly into clean, nested TypeScript interfaces and type definitions.",
  path: "/tools/dev/json-to-typescript",
  keywords: ["objects", "into", "typescript", "convert", "interfaces", "clean", "instantly", "definitions", "type", "nested", "json"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "JSON to TypeScript Type & Interface Converter",
    description: "Convert raw JSON objects instantly into clean, nested TypeScript interfaces and type definitions.",
    path: "/tools/dev/json-to-typescript",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <JsonToTypescriptClient />
    
      <RelatedTools currentToolUrl="/tools/dev/json-to-typescript" />
</div>
  );
}
