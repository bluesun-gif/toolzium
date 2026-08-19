import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DnsGeneratorClient from "@/components/tools/network/dns-generator-client";

const TITLE = "DNS Record Generator | Toolzium";
const DESCRIPTION = "Generate properly formatted DNS records (A, MX, CNAME, TXT, SPF, DMARC) for any domain. Copy and paste directly into your DNS provider.";
const PATH = "/tools/network/dns-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "DNS Record Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <DnsGeneratorClient />
    </>
  );
}
