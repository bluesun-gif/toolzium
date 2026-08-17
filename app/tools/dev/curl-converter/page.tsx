import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CurlConverterClient from "@/components/tools/dev/curl-converter-client";

const TITLE = "cURL to Code Converter — Convert cURL to Fetch, Python & Node.js | Toolzium";
const DESCRIPTION = "Convert cURL commands to executable code snippets in JavaScript Fetch, Python Requests, Node.js Axios, Go, PHP, and Rust. Instant 100% browser-based cURL parser.";
const PATH = "/tools/dev/curl-converter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "cURL to Code Converter",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CurlConverterClient />
    </>
  );
}
