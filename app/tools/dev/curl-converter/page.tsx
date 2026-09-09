import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CurlConverterClient from "@/components/tools/dev/curl-converter-client";

const TITLE = "cURL Converter [Free] — cURL to Python, Fetch, Node, Go Code";
const DESCRIPTION =
  "✅ 100% free • Instant conversion • No signup • Turn any cURL command into clean Python Requests, JS Fetch, Node axios, Go, PHP & 10+ language snippets.";
const PATH = "/tools/dev/curl-converter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "curl converter",
    "curl to python",
    "curl to fetch",
    "curl to node",
    "http request converter",
  ],
});

const FAQS = [
  { question: "Is this cURL converter really free?",
    answer: "Yes, 100% free forever. No credit card, no signup, unlimited conversions." },
  { question: "Do you store my API commands?",
    answer: "No. Parsing runs in your browser. Any Authorization headers or tokens you paste never leave your machine." },
  { question: "Which languages and libraries are supported?",
    answer: "Python (requests), JavaScript (fetch/axios), Node.js, TypeScript, PHP (cURL/Guzzle), Go, Ruby, Java, C#, and more." },
  { question: "How accurate is the generated code?",
    answer: "Headers, query params, bodies (JSON/form/multipart), auth and flags are mapped 1:1 to idiomatic code per language — copy and run." },
  ];

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "cURL to Code Converter",
    description: DESCRIPTION,
    path: PATH,
    faqs: FAQS,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CurlConverterClient />
    </>
  );
}
