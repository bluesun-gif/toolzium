import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PortReferenceClient from "@/components/tools/network/port-reference-client";

const TITLE = "Port Number Reference | Toolzium";
const DESCRIPTION = "Look up any TCP/UDP port number or service name. Complete IANA port registry reference — HTTP, HTTPS, SSH, FTP, SMTP and 1000+ more.";
const PATH = "/tools/network/port-reference";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Port Number Reference",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PortReferenceClient />
    </>
  );
}
