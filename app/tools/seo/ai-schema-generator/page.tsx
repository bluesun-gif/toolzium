import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiSchemaGeneratorClient from "@/components/tools/seo/ai-schema-generator-client";

export const metadata = buildMetadata({
  title: "AI Schema.org JSON-LD Structured Data Generator",
  description: "Generate Google Rich Snippet JSON-LD structured data for Products, Local Businesses, Software, and FAQs with live AI.",
  path: "/tools/seo/ai-schema-generator",
  keywords: ["products", "data", "local", "businesses", "generate", "snippet", "software", "google", "rich", "faqs", "structured", "json"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Schema.org JSON-LD Structured Data Generator",
    description: "Generate Google Rich Snippet JSON-LD structured data for Products, Local Businesses, Software, and FAQs with live AI.",
    path: "/tools/seo/ai-schema-generator",
    categoryName: "Seo",
    categoryPath: "/tools/seo",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <AiSchemaGeneratorClient />
    </div>
  );
}
