import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import IpLookupClient from "@/components/tools/network/ip-lookup-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "IP Geolocation Lookup",
  description: "Look up any IP address to find its geographic location, ISP, ASN, time zone, currency, and more. Free IP geolocation tool with lookup history.",
  path: "/tools/network/ip-lookup",
  keywords: ["location", "time", "address", "zone", "free", "more", "find", "look", "currency", "geographic", "geolocation", "tool"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "IP Geolocation Lookup",
    description: "Look up any IP address to find its geographic location, ISP, ASN, time zone, currency, and more. Free IP geolocation tool with lookup history.",
    path: "/tools/network/ip-lookup",
    categoryName: "Network",
    categoryPath: "/tools/network",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <IpLookupClient />
    
      <RelatedTools currentToolUrl="/tools/network/ip-lookup" />
</div>
  );
}
