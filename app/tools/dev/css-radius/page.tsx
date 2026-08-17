import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CssRadiusClient from "@/components/tools/dev/css-radius-client";

const TITLE = "Css Radius | Toolzium";
const DESCRIPTION = "Free online css radius tool with instant calculation and privacy.";
const PATH = "/tools/dev/css-radius";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Css Radius",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CssRadiusClient />
    </>
  );
}
