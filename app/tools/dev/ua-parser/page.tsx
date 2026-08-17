import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import UaParserClient from "@/components/tools/dev/ua-parser-client";

const TITLE = "Ua Parser | Toolzium";
const DESCRIPTION = "Free online ua parser tool with instant calculation and privacy.";
const PATH = "/tools/dev/ua-parser";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Ua Parser",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <UaParserClient />
    </>
  );
}
