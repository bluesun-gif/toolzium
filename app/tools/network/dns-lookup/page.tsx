import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DnsLookupClient from "@/components/tools/network/dns-lookup-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";
=======
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

export const metadata = buildMetadata({
  title: "DNS Lookup",
  description: "Query DNS records for any domain — A, AAAA, MX, NS, TXT, CNAME, SOA. Uses Google DNS-over-HTTPS for fast, accurate results with resolution time tracking.",
  path: "/tools/network/dns-lookup",
  keywords: ["cname", "aaaa", "results", "over", "google", "accurate", "uses", "fast", "domain", "records", "query", "https"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "DNS Lookup",
    description: "Query DNS records for any domain — A, AAAA, MX, NS, TXT, CNAME, SOA. Uses Google DNS-over-HTTPS for fast, accurate results with resolution time tracking.",
    path: "/tools/network/dns-lookup",
    categoryName: "Network",
    categoryPath: "/tools/network",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <DnsLookupClient />
    
      <RelatedTools currentToolUrl="/tools/network/dns-lookup" />
</div>
  );
}
