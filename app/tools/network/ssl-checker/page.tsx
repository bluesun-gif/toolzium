import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SslCheckerClient from "@/components/tools/network/ssl-checker-client";

export const metadata = buildMetadata({
  title: "SSL Certificate Checker",
  description: "Check SSL/TLS certificate details for any domain. See issuer, expiration date, days remaining, and certificate chain. Monitor your SSL certificates.",
  path: "/tools/network/ssl-checker",
  keywords: ["check", "issuer", "certificate", "expiration", "domain", "details", "days", "chain", "remaining", "monitor", "date"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "SSL Certificate Checker",
    description: "Check SSL/TLS certificate details for any domain. See issuer, expiration date, days remaining, and certificate chain. Monitor your SSL certificates.",
    path: "/tools/network/ssl-checker",
    categoryName: "Network",
    categoryPath: "/tools/network",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <SslCheckerClient />
    </div>
  );
}
