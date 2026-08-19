import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CorsHeadersClient from "@/components/tools/network/cors-headers-client";

const TITLE = "CORS Headers Checker | Toolzium";
const DESCRIPTION = "Test and debug CORS headers on any API endpoint. See Access-Control headers and identify cross-origin request issues instantly.";
const PATH = "/tools/network/cors-headers";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "CORS Header Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CorsHeadersClient />
    </>
  );
}
