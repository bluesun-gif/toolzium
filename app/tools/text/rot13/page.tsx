import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import Rot13Client from "@/components/tools/text/rot13-client";

const TITLE = "Rot13 | Toolzium";
const DESCRIPTION = "Free online rot13 tool with instant calculation and privacy.";
const PATH = "/tools/text/rot13";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Rot13",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <Rot13Client />
    </>
  );
}
