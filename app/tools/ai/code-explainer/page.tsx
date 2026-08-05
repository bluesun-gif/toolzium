import { Metadata } from "next";
import CodeExplainerClient from "@/components/tools/ai/code-explainer-client";
import { generateSEOMetadata } from "@/lib/seo-config";
import JsonLd from "@/components/seo/json-ld";

export const metadata: Metadata = generateSEOMetadata({
  title: "AI Code Explainer & Multi-Language Converter — Free Developer Tool",
  description: "Understand complex code snippets instantly with plain-English breakdowns and translate code seamlessly across Python, TypeScript, Rust, Go, and C++.",
  path: "/tools/ai/code-explainer",
});

export default function CodeExplainerPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does the AI Code Explainer work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It analyzes your input code syntax and structure to generate a clear, line-by-line plain-English summary of what the code accomplishes.",
        },
      },
      {
        "@type": "Question",
        name: "Which programming languages are supported for conversion?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can translate code seamlessly across Python, TypeScript, JavaScript, Rust, Go, and C++.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <CodeExplainerClient />
    </>
  );
}
