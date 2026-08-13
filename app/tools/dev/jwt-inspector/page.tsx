import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import JwtInspectorClient from "@/components/tools/dev/jwt-inspector-client";

export const metadata = buildMetadata({
  title: "JWT Security Audit & Payload Inspector Studio",
  description: "Decode JSON Web Tokens (JWT) locally and run live AI security risk audits for algorithm vulnerabilities and payload data leaks.",
  path: "/tools/dev/jwt-inspector",
  keywords: ["data", "security", "payload", "tokens", "algorithm", "decode", "audits", "risk", "locally", "live", "vulnerabilities", "json"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "JWT Security Audit & Payload Inspector Studio",
    description: "Decode JSON Web Tokens (JWT) locally and run live AI security risk audits for algorithm vulnerabilities and payload data leaks.",
    path: "/tools/dev/jwt-inspector",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <JwtInspectorClient />
    </div>
  );
}
