import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import IdGeneratorClient from "@/components/tools/util/id-generator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "ID Generator",
  description: "Generate unique readable order IDs, reference numbers, and short identifiers. Create human-friendly IDs for orders, tickets, and tracking numbers.",
  path: "/tools/util/id-generator",
  keywords: ["numbers", "identifiers", "human", "generate", "reference", "create", "orders", "unique", "order", "short", "friendly", "readable"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "ID Generator",
    description: "Generate unique readable order IDs, reference numbers, and short identifiers. Create human-friendly IDs for orders, tickets, and tracking numbers.",
    path: "/tools/util/id-generator",
    categoryName: "Util",
    categoryPath: "/tools/util",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <IdGeneratorClient />
    
      <RelatedTools currentToolUrl="/tools/util/id-generator" />
</div>
  );
}
