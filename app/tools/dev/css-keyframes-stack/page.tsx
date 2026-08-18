import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CssAnimationClient from "@/components/tools/dev/css-keyframes-stack-client";

const TITLE = "CSS Keyframe Multi-Animation Stacker | Toolzium";
const DESCRIPTION = "Visual CSS multi-animation builder. Chain multiple @keyframes on a single element and generate the CSS snippet.";
const PATH = "/tools/dev/css-keyframes-stack";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "CSS Keyframe Multi-Animation Stacker",
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
