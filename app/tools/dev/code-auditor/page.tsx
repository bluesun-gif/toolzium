import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CodeAuditorClient from "@/components/tools/dev/code-auditor-client";
export const metadata: Metadata = {
  title: "AI Code Refactoring & Security Vulnerability Auditor | Toolzium",
  description:
    "Audit JavaScript, TypeScript, Python, and SQL code for security vulnerabilities, memory leaks, and performance refactoring with live AI inference.",
};

export default function CodeAuditorPage() {
  return (
    <><CodeAuditorClient />
      <RelatedTools currentToolUrl="/tools/dev/code-auditor" />
    </>
  );
}
