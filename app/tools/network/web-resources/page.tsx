import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WebResourcesClient from "@/components/tools/network/web-resources-client";

const TITLE = "Web Resources | Toolzium";
const DESCRIPTION = "Free online web resources tool with instant calculation and privacy.";
const PATH = "/tools/network/web-resources";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Web Resources",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <WebResourcesClient />
    </>
  );
}
