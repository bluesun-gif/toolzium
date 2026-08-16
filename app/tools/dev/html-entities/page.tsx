import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import HtmlEntitiesClient from "@/components/tools/dev/html-entities-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
=======

>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export const metadata = buildMetadata({
  title: "HTML Entity Encoder",
  description: "Encode and decode HTML entities. Named vs numeric toggle. Common entities reference table. Auto-detect mode. Batch processing.",
  path: "/tools/dev/html-entities",
  keywords: ["table", "reference", "encode", "decode", "common", "numeric", "auto", "named", "toggle", "html", "entities"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "HTML Entity Encoder",
    description: "Encode and decode HTML entities. Named vs numeric toggle. Common entities reference table. Auto-detect mode. Batch processing.",
    path: "/tools/dev/html-entities",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <HtmlEntitiesClient />
    
      <RelatedTools currentToolUrl="/tools/dev/html-entities" />
</div>
  );
}
