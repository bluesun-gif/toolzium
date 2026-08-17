import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ExifInspectorClient from "@/components/tools/image/exif-inspector-client";

const TITLE = "Photo EXIF Metadata Inspector & Privacy GPS Stripper | Toolzium";
const DESCRIPTION = "Inspect camera settings, aperture, ISO, and GPS location coordinates, and strip EXIF metadata 100% locally in your browser.";
const PATH = "/tools/image/exif-inspector";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Photo EXIF Metadata Inspector & Privacy GPS Stripper",
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
