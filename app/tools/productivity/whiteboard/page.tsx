import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WhiteboardClient from "@/components/tools/productivity/whiteboard-client";

const TITLE = "Whiteboard | Toolzium";
const DESCRIPTION = "Free online whiteboard tool with instant calculation and privacy.";
const PATH = "/tools/productivity/whiteboard";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Whiteboard",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <WhiteboardClient />
    </>
  );
}
