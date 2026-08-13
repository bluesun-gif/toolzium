import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EcommerceCopyGeneratorClient from "@/components/tools/marketing/ecommerce-copy-generator-client";

export const metadata = buildMetadata({
  title: "Shopify & Amazon Product Listing AI Copy Generator",
  description: "Generate high-converting Amazon product bullet points, Shopify descriptions, and high-search SEO product titles with live AI.",
  path: "/tools/marketing/ecommerce-copy-generator",
  keywords: ["product", "points", "generate", "bullet", "descriptions", "converting", "search", "amazon", "high", "shopify"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Shopify & Amazon Product Listing AI Copy Generator",
    description: "Generate high-converting Amazon product bullet points, Shopify descriptions, and high-search SEO product titles with live AI.",
    path: "/tools/marketing/ecommerce-copy-generator",
    categoryName: "Marketing",
    categoryPath: "/tools/marketing",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <EcommerceCopyGeneratorClient />
    </div>
  );
}
