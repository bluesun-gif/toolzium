import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CaseConverterClient from "@/components/tools/text/case-converter-client";

export const metadata = buildMetadata({
  title: "Case Converter",
  description: "Convert text to uppercase, lowercase, title case, sentence case, camelCase, snake_case, kebab-case, and more. Transform text formatting instantly for programming, writing, and data processing.",
  path: "/tools/text/case-converter",
  keywords: ["convert", "sentence", "camelcase", "more", "kebab", "lowercase", "case", "uppercase", "text", "title"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Case Converter",
    description: "Convert text to uppercase, lowercase, title case, sentence case, camelCase, snake_case, kebab-case, and more. Transform text formatting instantly for programming, writing, and data processing.",
    path: "/tools/text/case-converter",
    categoryName: "Text",
    categoryPath: "/tools/text",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <CaseConverterClient />
    </div>
  );
}
