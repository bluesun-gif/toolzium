import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SchemaGeneratorClient from "@/components/tools/seo/schema-generator-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "Schema Markup Generator",
  description: "Generate JSON-LD structured data for rich snippets. Create schema markup for Articles, Products, Organizations, LocalBusiness, FAQ, and more. Improve SEO with structured data.",
  path: "/tools/seo/schema-generator",
  keywords: ["products", "data", "generate", "organizations", "create", "articles", "rich", "markup", "structured", "snippets", "schema", "json"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Schema Markup Generator",
    description: "Generate JSON-LD structured data for rich snippets. Create schema markup for Articles, Products, Organizations, LocalBusiness, FAQ, and more. Improve SEO with structured data.",
    path: "/tools/seo/schema-generator",
    categoryName: "Seo",
    categoryPath: "/tools/seo",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <SchemaGeneratorClient />
    
      <RelatedTools currentToolUrl="/tools/seo/schema-generator" />
</div>
  );
}
