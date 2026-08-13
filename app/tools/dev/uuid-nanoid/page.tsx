import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import UuidNanoidClient from "@/components/tools/dev/uuid-nanoid-client";

export const metadata = buildMetadata({
  title: "UUID / NanoID Generator",
  description: "Generate unique UUIDs (v4), NanoIDs, and short IDs online. Create universally unique identifiers for databases, APIs, and distributed systems. Bulk UUID generator with copy-to-clipboard.",
  path: "/tools/dev/uuid-nanoid",
  keywords: ["identifiers", "databases", "generate", "create", "nanoids", "uuids", "unique", "online", "short", "apis", "universally"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "UUID / NanoID Generator",
    description: "Generate unique UUIDs (v4), NanoIDs, and short IDs online. Create universally unique identifiers for databases, APIs, and distributed systems. Bulk UUID generator with copy-to-clipboard.",
    path: "/tools/dev/uuid-nanoid",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <UuidNanoidClient />
    </div>
  );
}
