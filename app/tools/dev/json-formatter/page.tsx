import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import JsonFormatterClient from "@/components/tools/dev/json-formatter-client";

const TITLE = "JSON Formatter [Free] — Beautify, Validate & Minify Instantly";
const DESCRIPTION =
  "✅ 100% free • Runs in your browser • No file upload • Beautify, validate, minify & debug JSON with error line detection, tree view, and copy/download.";
const PATH = "/tools/dev/json-formatter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "json formatter",
    "json validator",
    "json beautifier",
    "json minifier",
    "json prettify",
  ],
});

const FAQS = [
  { question: "Is this JSON formatter really free?",
    answer: "Yes, 100% free forever. No credit card, no signup, unlimited formatting." },
  { question: "Do you store my JSON data?",
    answer: "No. All parsing and formatting runs client-side in your browser. Your data never touches our servers." },
  { question: "What can this tool do?",
    answer: "Pretty-print, minify, validate syntax with exact error line reporting, tree exploration, sort keys, and export as .json files." },
  { question: "How accurate and fast are the results?",
    answer: "Instant formatting even for multi-MB payloads, using a standards-compliant RFC 8259 parser that flags trailing commas, bad escapes, and truncation." },
  ];

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "JSON Formatter, Validator & Minifier",
    description: DESCRIPTION,
    path: PATH,
    faqs: FAQS,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonFormatterClient />
    </>
  );
}
