import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BoxShadowClient from "@/components/tools/dev/box-shadow-client";

const TITLE = "CSS Box Shadow Generator | Toolzium";
const DESCRIPTION = "Generate CSS box shadow rules visually with support for multiple layers, colors, and Tailwind CSS output.";
const PATH = "/tools/dev/box-shadow";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "CSS Box Shadow Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <BoxShadowClient />
    </>
  );
}
