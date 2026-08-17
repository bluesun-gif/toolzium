import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CodeExplainerClient from "@/components/tools/ai/code-explainer-client";

const TITLE = "AI Code Explainer & Multi-Language Converter — Free Developer Tool | Toolzium";
const DESCRIPTION = "Understand complex code snippets instantly with plain-English breakdowns and translate code seamlessly across Python, TypeScript, Rust, Go, and C++.";
const PATH = "/tools/ai/code-explainer";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Code Explainer & Multi-Language Converter",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CodeExplainerClient />
    </>
  );
}
