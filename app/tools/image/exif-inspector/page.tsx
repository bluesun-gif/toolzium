import ExifInspectorClient from "@/components/tools/image/exif-inspector-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = {
  title: "Photo EXIF Metadata Inspector & Privacy GPS Stripper | Toolzium",
  description: "Inspect camera settings, aperture, ISO, and GPS location coordinates, and strip EXIF metadata 100% locally in your browser.",
};

export default function ExifInspectorPage() {
  return (
    <><ExifInspectorClient />
      <RelatedTools currentToolUrl="/tools/image/exif-inspector" />
    </>
  );
}
