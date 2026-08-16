import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EcommerceCopyGeneratorClient from "@/components/tools/marketing/ecommerce-copy-generator-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Shopify & Amazon Product Listing AI Copy Generator",
  description: "Generate high-converting Amazon product bullet points, Shopify descriptions, and high-search SEO product titles with live AI.",
  path: "/tools/marketing/ecommerce-copy-generator",
  keywords: ["product", "points", "generate", "bullet", "descriptions", "converting", "search", "amazon", "high", "shopify"],
});

export default function EcommerceCopyGeneratorPage() {
  return (
    <><EcommerceCopyGeneratorClient />
      <RelatedTools currentToolUrl="/tools/marketing/ecommerce-copy-generator" />
    </>
  );
}
