import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import IpLookupClient from "@/components/tools/network/ip-lookup-client";

const TITLE = "IP Address Lookup | Toolzium";
const DESCRIPTION = "Look up geolocation, ISP, ASN, and timezone for any IP address. Find country, city, and region from IPv4 or IPv6 addresses instantly.";
const PATH = "/tools/network/ip-lookup";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Ip Lookup",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <IpLookupClient />
    </>
  );
}
