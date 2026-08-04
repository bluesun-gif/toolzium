import JsonLd from "@/components/seo/json-ld";
import { CurlConverterClient } from "@/components/tools/dev/curl-converter-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "cURL Code Converter | Toolzium",
  description: "Convert cURL commands to JavaScript, Python, Go, PHP, Rust, and more code snippets instantly.",
  path: "/tools/dev/curl-converter",
  keywords: ["curl to code", "curl converter", "convert curl to fetch", "convert curl to python requests", "developer tools"],
});

export default function Page() {
  const toolUrl = siteURL + "/tools/dev/curl-converter";
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "cURL Code Converter",
    url: toolUrl,
    description: "Convert cURL commands to code snippets in various programming languages.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
      { "@type": "ListItem", position: 2, name: "Developer Tools", item: siteURL + "/tools#cat-dev" },
      { "@type": "ListItem", position: 3, name: "cURL Code Converter", item: toolUrl }
    ]
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What languages are supported?", acceptedAnswer: { "@type": "Answer", text: "We support JavaScript (Fetch, Axios), Node.js, Python (Requests), Go, PHP, and Rust." } }
    ]
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <JsonLd data={faqLd} />
      <CurlConverterClient />
    </div>
  );
}
