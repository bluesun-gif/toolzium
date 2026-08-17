import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import JwtInspectorClient from "@/components/tools/dev/jwt-inspector-client";

const TITLE = "JWT Security Audit & Payload Inspector Studio";
const DESCRIPTION = "Decode JSON Web Tokens (JWT) locally and run live AI security risk audits for algorithm vulnerabilities and payload data leaks.";
const PATH = "/tools/dev/jwt-inspector";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "JWT Security Audit & Payload Inspector Studio",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <JwtInspectorClient />
    </>
  );
}
