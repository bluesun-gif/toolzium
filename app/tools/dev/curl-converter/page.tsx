import { buildMetadata } from "@/lib/seo";
import { siteURL } from "@/lib/constants";
import JsonLd from "@/components/seo/json-ld";
import CurlConverterClient from "@/components/tools/dev/curl-converter-client";

const TITLE = "cURL to Code Converter — Convert cURL to Fetch, Python & Node.js | Toolzium";
const DESCRIPTION = "Convert cURL commands to executable code snippets in JavaScript Fetch, Python Requests, Node.js Axios, Go, PHP, and Rust. Instant 100% browser-based cURL parser.";
const PATH = "/tools/dev/curl-converter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "curl to fetch", "curl to python", "curl to node js", "curl to javascript", 
    "curl command to code", "convert curl request", "curl parser", "curl to axios", "curl to go", "Toolzium"
  ],
});

export default function Page() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "cURL to Code Converter",
      description: DESCRIPTION,
      url: siteURL + PATH,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteURL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Developer Tools",
          item: siteURL + "/tools/dev",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "cURL Converter",
          item: siteURL + PATH,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd as any} />
      <CurlConverterClient />
    </>
  );
}
