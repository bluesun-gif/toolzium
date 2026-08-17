import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CssFlexboxBuilderClient from "@/components/tools/dev/css-flexbox-builder-client";

const TITLE = "CSS Flexbox Layout Visual Builder | Toolzium";
const DESCRIPTION = "Interactive visual CSS Flexbox playground to generate CSS layout code.";
const PATH = "/tools/dev/css-flexbox-builder";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "CSS Flexbox Layout Visual Builder",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CssFlexboxBuilderClient />
    </>
  );
}
