import JsonLd from "@/components/seo/json-ld";
import HttpHeadersClient from "@/components/tools/network/http-headers-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HTTP Header Checker",
  description: "Check the HTTP response headers of any URL. Analyze security headers, caching directives, and server configuration for SEO and security.",
  path: "/tools/network/http-headers",
  keywords: ["HTTP Header Checker", "check headers", "security headers", "response headers", "Toolzium", "online tools"],
});

export default function Page() {
  const toolUrl = `${siteURL}/tools/network/http-headers`;
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "HTTP Header Checker — Toolzium",
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: ["en"],
    description: "Check the HTTP response headers of any URL. Analyze security headers, caching directives, and server configuration for SEO and security.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Check HTTP headers", "Analyze security headers", "View server configuration"],
    creator: { "@type": "Organization", name: "Toolzium", url: "https://toolzium.com" },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteURL}/tools` },
      { "@type": "ListItem", position: 2, name: "Network & Security", item: `${siteURL}/tools#cat-network-security` },
      { "@type": "ListItem", position: 3, name: "HTTP Header Checker", item: toolUrl },
    ],
  };
  return (
    <div className="space-y-4">
      <JsonLd data={appLd} />
      <JsonLd data={crumbsLd} />
      <HttpHeadersClient />
    </div>
  );
}
