import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CorsHeadersClient from "@/components/tools/network/cors-headers-client";

const TITLE = "CORS Header Generator | Toolzium";
const DESCRIPTION = "Generate CORS headers for your server or application.";
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
