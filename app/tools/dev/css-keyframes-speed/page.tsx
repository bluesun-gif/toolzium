import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CssKeyframesSpeedClient from "@/components/tools/dev/css-keyframes-speed-client";

const TITLE = "Css Keyframes Speed | Toolzium";
const DESCRIPTION = "Free online css keyframes speed tool with instant calculation and privacy.";
const PATH = "/tools/dev/css-keyframes-speed";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Css Keyframes Speed",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CssKeyframesSpeedClient />
    </>
  );
}
