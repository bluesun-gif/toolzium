import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import Base64Client from "@/components/tools/text/base64-client";

const TITLE = "Base64 | Toolzium";
const DESCRIPTION = "Free online base64 tool with instant calculation and privacy.";
const PATH = "/tools/text/base64";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Base64",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <Base64Client />
    </>
  );
}
