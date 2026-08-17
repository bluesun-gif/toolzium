import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MindMapClient from "@/components/tools/productivity/mind-map-client";

const TITLE = "Mind Map Builder | Toolzium";
const DESCRIPTION = "Create and export visual mind maps easily.";
const PATH = "/tools/productivity/mind-map";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Mind Map Builder",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MindMapClient />
    </>
  );
}
