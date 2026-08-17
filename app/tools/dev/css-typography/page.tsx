import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CssTypographyClient from "@/components/tools/dev/css-typography-client";

const TITLE = "CSS Typography & Text Effect Generator | Toolzium";
const DESCRIPTION = "Visually generate and preview CSS typography and text effects. Customize text shadows, gradients, strokes, and more with live CSS code output.";
const PATH = "/tools/dev/css-typography";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "CSS Typography & Text Effect Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CssTypographyClient />
    </>
  );
}
