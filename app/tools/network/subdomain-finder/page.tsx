import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SubdomainFinderClient from "@/components/tools/network/subdomain-finder-client";

const TITLE = "Subdomain Finder | Toolzium";
const DESCRIPTION = "Discover all subdomains for any domain using certificate transparency logs and DNS enumeration. Free subdomain scanner for security research.";
const PATH = "/tools/network/subdomain-finder";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Subdomain Finder",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SubdomainFinderClient />
    </>
  );
}
