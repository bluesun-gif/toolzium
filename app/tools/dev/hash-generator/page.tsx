import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import HashGeneratorClient from "@/components/tools/dev/hash-generator-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Hash Generator",
  description: "Generate MD5, SHA1, SHA256, SHA512, and other cryptographic hashes online. Hash text, files, and passwords with multiple algorithms. Free hash calculator and checksum generator.",
  path: "/tools/dev/hash-generator",
  keywords: ["algorithms", "hash", "passwords", "with", "generate", "text", "files", "online", "cryptographic", "other", "hashes", "multiple"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Hash Generator",
    description: "Generate MD5, SHA1, SHA256, SHA512, and other cryptographic hashes online. Hash text, files, and passwords with multiple algorithms. Free hash calculator and checksum generator.",
    path: "/tools/dev/hash-generator",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <HashGeneratorClient />
    
      <RelatedTools currentToolUrl="/tools/dev/hash-generator" />
</div>
  );
}
