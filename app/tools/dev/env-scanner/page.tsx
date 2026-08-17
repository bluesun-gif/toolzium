import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EnvScannerClient from "@/components/tools/dev/env-scanner-client";

const TITLE = "Env Variables Security Risk & Secret Leak Scanner | Toolzium";
const DESCRIPTION = "Audit .env files for leaked production API keys, hardcoded database credentials, and NEXT_PUBLIC prefix vulnerabilities with live AI inference.";
const PATH = "/tools/dev/env-scanner";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Env Variables Security Risk & Secret Leak Scanner",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EnvScannerClient />
    </>
  );
}
