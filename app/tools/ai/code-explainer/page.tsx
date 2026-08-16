import { Metadata } from "next";
import CodeExplainerClient from "@/components/tools/ai/code-explainer-client";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import JsonLd from "@/components/seo/json-ld";
const TITLE = "AI Code Explainer & Multi-Language Converter — Free Developer Tool | Toolzium";
const DESCRIPTION =
  "Understand complex code snippets instantly with plain-English breakdowns and translate code seamlessly across Python, TypeScript, Rust, Go, and C++.";
const PATH = "/tools/ai/code-explainer";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "AI code explainer",
    "code translator",
    "convert Python to TypeScript",
    "Rust code converter",
    "understand code online",
    "free developer tools",
  ],
});

export default function CodeExplainerPage() {
  const jsonLdData = buildToolJsonLd({
    name: "AI Code Explainer & Converter",
    description: DESCRIPTION,
    path: PATH,
    categoryName: "AI Tools",
    categoryPath: "/tools/ai",
    faqs: [
      {
        question: "How does the AI Code Explainer work?",
        answer:
          "It analyzes your input code syntax and structure to generate a clear, line-by-line plain-English summary of what the code accomplishes.",
      },
      {
        question: "Which programming languages are supported for conversion?",
        answer:
          "You can translate code seamlessly across Python, TypeScript, JavaScript, Rust, Go, and C++.",
      },
    ],
  });

  return (
    <>
      <JsonLd data={jsonLdData as any} />
      <CodeExplainerClient />
    
      <RelatedTools currentToolUrl="/tools/ai/code-explainer" />
</>
  );
}
