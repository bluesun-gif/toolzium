import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import HtmlEntitiesClient from "@/components/tools/dev/html-entities-client";

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
    </div>
  );
}
