import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import HttpHeadersClient from "@/components/tools/network/http-headers-client";

const TITLE = "Http Headers | Toolzium";
const DESCRIPTION = "Free online http headers tool with instant calculation and privacy.";
const PATH = "/tools/network/http-headers";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Http Headers",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <HttpHeadersClient />
    </>
  );
}
