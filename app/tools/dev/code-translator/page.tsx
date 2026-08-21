import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CodeTranslatorClient from "@/components/tools/dev/code-translator-client";

const TITLE = "AI Universal Code Translator & Polyglot Engine | Toolzium";
const DESCRIPTION = "Convert, translate, and infer type definitions across Python, JavaScript, TypeScript, Go, Rust, Java, C++, Zod, and Pydantic. 100% free with in-browser privacy.";
const PATH = "/tools/dev/code-translator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "code translator",
    "python to javascript",
    "javascript to python",
    "json to typescript",
    "json to go struct",
    "json to rust struct",
    "json to pydantic",
    "json to zod schema",
    "code converter",
    "polyglot code translator",
    "free developer tools",
  ],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Universal Code Translator & Polyglot Engine",
    description: DESCRIPTION,
    path: PATH,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CodeTranslatorClient />
    </>
  );
}
