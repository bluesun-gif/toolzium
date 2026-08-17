import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EmailHeadersClient from "@/components/tools/network/email-headers-client";

const TITLE = "Email Headers | Toolzium";
const DESCRIPTION = "Free online email headers tool with instant calculation and privacy.";
const PATH = "/tools/network/email-headers";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Email Headers",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EmailHeadersClient />
    </>
  );
}
