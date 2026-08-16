import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MacLookupClient from "@/components/tools/network/mac-lookup-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "MAC Address Lookup",
  description: "Look up the manufacturer of any network device by its MAC address. Identify vendor, OUI prefix, and MAC type (unicast/multicast). Random MAC generator included.",
  path: "/tools/network/mac-lookup",
  keywords: ["identify", "random", "manufacturer", "unicast", "address", "network", "prefix", "device", "look", "multicast", "type", "vendor"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "MAC Address Lookup",
    description: "Look up the manufacturer of any network device by its MAC address. Identify vendor, OUI prefix, and MAC type (unicast/multicast). Random MAC generator included.",
    path: "/tools/network/mac-lookup",
    categoryName: "Network",
    categoryPath: "/tools/network",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <MacLookupClient />
    
      <RelatedTools currentToolUrl="/tools/network/mac-lookup" />
</div>
  );
}
