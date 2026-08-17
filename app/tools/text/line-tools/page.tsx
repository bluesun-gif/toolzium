import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import LineToolsClient from "@/components/tools/text/line-tools-client";

const TITLE = "Line Tools | Toolzium";
const DESCRIPTION = "Free online line tools tool with instant calculation and privacy.";
const PATH = "/tools/text/line-tools";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Line Tools",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <LineToolsClient />
    </>
  );
}
