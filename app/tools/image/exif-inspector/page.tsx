import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ExifInspectorClient from "@/components/tools/image/exif-inspector-client";

export const metadata = buildMetadata({
  title: "Photo EXIF Metadata Inspector & Privacy GPS Stripper | Toolzium",
  description: "Inspect camera settings, aperture, ISO, and GPS location coordinates, and strip EXIF metadata 100% locally in your browser.",
  path: "/tools/image/exif-inspector",
  keywords: ["exif", "strip", "your", "location", "metadata", "inspect", "browser", "settings", "aperture", "locally", "coordinates", "camera"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Photo EXIF Metadata Inspector & Privacy GPS Stripper",
    description: "Inspect camera settings, aperture, ISO, and GPS location coordinates, and strip EXIF metadata 100% locally in your browser.",
    path: "/tools/image/exif-inspector",
    categoryName: "Image",
    categoryPath: "/tools/image",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ExifInspectorClient />
    </div>
  );
}
