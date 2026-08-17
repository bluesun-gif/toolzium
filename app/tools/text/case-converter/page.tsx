import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CaseConverterClient from "@/components/tools/text/case-converter-client";

const TITLE = "Case Converter — Uppercase, Lowercase, Title Case & Slugify | Toolzium";
const DESCRIPTION = "Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, and URL slugs online. Free text case converter tool.";
const PATH = "/tools/text/case-converter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Case Converter",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CaseConverterClient />
    </>
  );
}
