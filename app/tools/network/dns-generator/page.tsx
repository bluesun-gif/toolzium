import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DnsGeneratorClient from "@/components/tools/network/dns-generator-client";

const TITLE = "DNS Record Generator | Toolzium";
const DESCRIPTION = "Generate standard DNS records for web and email setups.";
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
