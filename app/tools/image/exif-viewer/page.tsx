import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ExifInspectorClient from "@/components/tools/image/exif-viewer-client";

const TITLE = "Exif Viewer | Toolzium";
const DESCRIPTION = "Free online exif viewer tool with instant calculation and privacy.";
const PATH = "/tools/image/exif-viewer";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Exif Viewer",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ExifInspectorClient />
    </>
  );
}
