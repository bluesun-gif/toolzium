import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CssKeyframesBuilderClient from "@/components/tools/dev/css-keyframes-builder-client";

const TITLE = "CSS Keyframe Visual Animation Builder | Toolzium";
const DESCRIPTION = "Visually build, preview, and generate CSS keyframe animations. Edit transform, opacity, and other properties across a custom timeline.";
const PATH = "/tools/dev/css-keyframes-builder";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "CSS Keyframe Visual Animation Builder",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CssKeyframesBuilderClient />
    </>
  );
}
