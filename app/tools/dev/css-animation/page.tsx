import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CssAnimationClient from "@/components/tools/dev/css-animation-client";

const TITLE = "CSS Animation Generator | Toolzium";
const DESCRIPTION = "Generate CSS keyframe animations visually.";
const PATH = "/tools/dev/css-animation";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "CSS Animation Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CssAnimationClient />
    </>
  );
}
