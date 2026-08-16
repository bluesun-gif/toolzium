import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EnvScannerClient from "@/components/tools/dev/env-scanner-client";
<<<<<<< HEAD
export const metadata: Metadata = {
  title: "Env Variables Security Risk & Secret Leak Scanner | Toolzium",
  description:
    "Audit .env files for leaked production API keys, hardcoded database credentials, and NEXT_PUBLIC prefix vulnerabilities with live AI inference.",
};

export default function EnvScannerPage() {
  return (
    <><EnvScannerClient />
      <RelatedTools currentToolUrl="/tools/dev/env-scanner" />
    </>
=======

export const metadata = buildMetadata({
  title: "Env Variables Security Risk & Secret Leak Scanner",
  description: "Audit .env files for leaked production API keys, hardcoded database credentials, and NEXT_PUBLIC prefix vulnerabilities with live AI inference.",
  path: "/tools/dev/env-scanner",
  keywords: ["hardcoded", "with", "database", "leaked", "files", "audit", "production", "prefix", "credentials", "live", "keys", "vulnerabilities"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Env Variables Security Risk & Secret Leak Scanner",
    description: "Audit .env files for leaked production API keys, hardcoded database credentials, and NEXT_PUBLIC prefix vulnerabilities with live AI inference.",
    path: "/tools/dev/env-scanner",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <EnvScannerClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
