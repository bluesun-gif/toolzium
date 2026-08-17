import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CodeAuditorClient from "@/components/tools/dev/code-auditor-client";

const TITLE = "AI Code Refactoring & Security Vulnerability Auditor | Toolzium";
const DESCRIPTION = "Audit JavaScript, TypeScript, Python, and SQL code for security vulnerabilities, memory leaks, and performance refactoring with live AI inference.";
const PATH = "/tools/dev/code-auditor";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Code Refactoring & Security Vulnerability Auditor",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CodeAuditorClient />
    </>
  );
}
