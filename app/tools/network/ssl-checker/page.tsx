import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SslCheckerClient from "@/components/tools/network/ssl-checker-client";

const TITLE = "Ssl Checker | Toolzium";
const DESCRIPTION = "Free online ssl checker tool with instant calculation and privacy.";
const PATH = "/tools/network/ssl-checker";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Ssl Checker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SslCheckerClient />
    </>
  );
}
