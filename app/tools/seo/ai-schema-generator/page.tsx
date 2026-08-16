import { Metadata } from "next";
import AiSchemaGeneratorClient from "@/components/tools/seo/ai-schema-generator-client";
export const metadata: Metadata = {
  title: "AI Schema.org JSON-LD Structured Data Generator | Toolzium",
  description:
    "Generate Google Rich Snippet JSON-LD structured data for Products, Local Businesses, Software, and FAQs with live AI.",
};

export default function AiSchemaGeneratorPage() {
  return (
    <><AiSchemaGeneratorClient />
      <RelatedTools currentToolUrl="/tools/seo/ai-schema-generator" />
    </>
  );
}
