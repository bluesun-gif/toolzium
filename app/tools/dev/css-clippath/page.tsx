import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CssClippathClient from "@/components/tools/dev/css-clippath-client";

const TITLE = "Css Clippath | Toolzium";
const DESCRIPTION = "Free online css clippath tool with instant calculation and privacy.";
const PATH = "/tools/dev/css-clippath";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Css Clippath",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CssClippathClient />
    </>
  );
}
