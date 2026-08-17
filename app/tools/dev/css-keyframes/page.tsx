import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CssKeyframesClient from "@/components/tools/dev/css-keyframes-client";

const TITLE = "CSS Keyframe Animation Visual Generator | Toolzium";
const DESCRIPTION = "Visually generate and customize CSS keyframe animations.";
const PATH = "/tools/dev/css-keyframes";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "CSS Keyframe Animation Visual Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CssKeyframesClient />
    </>
  );
}
