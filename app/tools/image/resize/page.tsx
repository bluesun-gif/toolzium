import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ImageResizeClient from "@/components/tools/image/image-resize-client";

const TITLE = "Resize | Toolzium";
const DESCRIPTION = "Free online resize tool with instant calculation and privacy.";
const PATH = "/tools/image/resize";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Resize",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ImageResizeClient />
    </>
  );
}
