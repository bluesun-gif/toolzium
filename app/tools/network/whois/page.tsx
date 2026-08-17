import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WhoisClient from "@/components/tools/network/whois-client";

const TITLE = "Whois | Toolzium";
const DESCRIPTION = "Free online whois tool with instant calculation and privacy.";
const PATH = "/tools/network/whois";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Whois",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <WhoisClient />
    </>
  );
}
