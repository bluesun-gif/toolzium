import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CurlConverterClient from "@/components/tools/dev/curl-converter-client";

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
    </div>
  );
}
