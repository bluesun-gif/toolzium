import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CurlConverterClient from "@/components/tools/dev/curl-converter-client";
<<<<<<< HEAD
const TITLE = "cURL to Code Converter — Convert cURL to Fetch, Python & Node.js | Toolzium";
const DESCRIPTION = "Convert cURL commands to executable code snippets in JavaScript Fetch, Python Requests, Node.js Axios, Go, PHP, and Rust. Instant 100% browser-based cURL parser.";
const PATH = "/tools/dev/curl-converter";
=======
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

export const metadata = buildMetadata({
  title: "cURL Code Converter",
  description: "Convert cURL command line requests into JS Fetch, Axios, Node.js, Python requests, Go, PHP, Rust code snippets.",
  path: "/tools/dev/curl-converter",
  keywords: ["requests", "curl", "rust", "into", "convert", "python", "command", "node", "line", "axios", "fetch"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "cURL Code Converter",
    description: "Convert cURL command line requests into JS Fetch, Axios, Node.js, Python requests, Go, PHP, Rust code snippets.",
    path: "/tools/dev/curl-converter",
    categoryName: "Dev",
    categoryPath: "/tools/dev",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <CurlConverterClient />
<<<<<<< HEAD
    
      <RelatedTools currentToolUrl="/tools/dev/curl-converter" />
</>
=======
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
