import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import IpLookupClient from "@/components/tools/network/ip-lookup-client";

const TITLE = "Ip Lookup | Toolzium";
const DESCRIPTION = "Free online ip lookup tool with instant calculation and privacy.";
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
