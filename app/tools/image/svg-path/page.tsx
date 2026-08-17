import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SvgPathClient from "@/components/tools/image/svg-path-client";

const TITLE = "SVG Path Visualizer & Editor | Toolzium";
const DESCRIPTION = "Visually edit, inspect, and generate SVG path strings with real-time preview.";
const PATH = "/tools/image/svg-path";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "SVG Path Visualizer & Editor",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SvgPathClient />
    </>
  );
}
