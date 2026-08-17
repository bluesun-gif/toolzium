import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DnsLookupClient from "@/components/tools/network/dns-lookup-client";

const TITLE = "Dns Lookup | Toolzium";
const DESCRIPTION = "Free online dns lookup tool with instant calculation and privacy.";
const PATH = "/tools/network/dns-lookup";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Dns Lookup",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <DnsLookupClient />
    </>
  );
}
