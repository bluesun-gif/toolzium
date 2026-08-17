import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SubdomainFinderClient from "@/components/tools/network/subdomain-finder-client";

const TITLE = "Subdomain Finder | Toolzium";
const DESCRIPTION = "Free online subdomain finder tool with instant calculation and privacy.";
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
