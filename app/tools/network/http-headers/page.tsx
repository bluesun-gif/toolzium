import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import HttpHeadersClient from "@/components/tools/network/http-headers-client";

export const metadata = buildMetadata({
  title: "HTTP Header Checker",
  description: "Check HTTP response headers for any URL. Analyze security headers like CSP, HSTS, X-Frame-Options, and get a security score. Find missing security headers.",
  path: "/tools/network/http-headers",
  keywords: ["frame", "check", "security", "hsts", "options", "like", "headers", "http", "response", "analyze"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "HTTP Header Checker",
    description: "Check HTTP response headers for any URL. Analyze security headers like CSP, HSTS, X-Frame-Options, and get a security score. Find missing security headers.",
    path: "/tools/network/http-headers",
    categoryName: "Network",
    categoryPath: "/tools/network",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <HttpHeadersClient />
    </div>
  );
}
