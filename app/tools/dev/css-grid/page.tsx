import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CssGridClient from "@/components/tools/dev/css-grid-client";

const TITLE = "Css Grid | Toolzium";
const DESCRIPTION = "Free online css grid tool with instant calculation and privacy.";
const PATH = "/tools/dev/css-grid";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Css Grid",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CssGridClient />
    </>
  );
}
