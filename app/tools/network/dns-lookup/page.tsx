import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DnsLookupClient from "@/components/tools/network/dns-lookup-client";

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
    </div>
  );
}
