import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CodeAuditorClient from "@/components/tools/dev/code-auditor-client";
<<<<<<< HEAD
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
=======

export const metadata = buildMetadata({
  title: "AI Code Refactoring & Security Vulnerability Auditor",
  description: "Audit JavaScript, TypeScript, Python, and SQL code for security vulnerabilities, memory leaks, and performance refactoring with live AI inference.",
  path: "/tools/dev/code-auditor",
  keywords: ["with", "javascript", "memory", "security", "leaks", "python", "audit", "performance", "refactoring", "vulnerabilities", "code", "typescript"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Code Refactoring & Security Vulnerability Auditor",
    description: "Audit JavaScript, TypeScript, Python, and SQL code for security vulnerabilities, memory leaks, and performance refactoring with live AI inference.",
    path: "/tools/dev/code-auditor",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <CodeAuditorClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
