import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiMetaGeneratorClient from "@/components/tools/seo/ai-meta-generator-client";

export const metadata = buildMetadata({
  title: "AI High-CTR SEO Title & Meta Description Generator",
  description: "Generate search-optimized HTML title tags and meta descriptions tailored for maximum organic Google click-through rates with live AI.",
  path: "/tools/seo/ai-meta-generator",
  keywords: ["tailored", "generate", "optimized", "meta", "google", "descriptions", "organic", "search", "html", "tags", "title", "maximum"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI High-CTR SEO Title & Meta Description Generator",
    description: "Generate search-optimized HTML title tags and meta descriptions tailored for maximum organic Google click-through rates with live AI.",
    path: "/tools/seo/ai-meta-generator",
    categoryName: "Seo",
    categoryPath: "/tools/seo",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <AiMetaGeneratorClient />
    </div>
  );
}
