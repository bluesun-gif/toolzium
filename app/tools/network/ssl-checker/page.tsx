import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SslCheckerClient from "@/components/tools/network/ssl-checker-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";
=======
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

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
    
      <RelatedTools currentToolUrl="/tools/network/ssl-checker" />
</div>
  );
}
