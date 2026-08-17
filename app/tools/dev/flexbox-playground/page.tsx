import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FlexboxPlaygroundClient from "@/components/tools/dev/flexbox-playground-client";

const TITLE = "CSS Flexbox Playground | Toolzium";
const DESCRIPTION = "Interactive CSS Flexbox layout builder. Visually create flexbox layouts and generate CSS code.";
const PATH = "/tools/dev/flexbox-playground";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "CSS Flexbox Playground",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <FlexboxPlaygroundClient />
    </>
  );
}
