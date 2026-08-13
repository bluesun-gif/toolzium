import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ExifViewerClient from "@/components/tools/image/exif-viewer-client";

export const metadata = buildMetadata({
  title: "EXIF Metadata Viewer",
  description: "View and extract EXIF metadata from photos — camera make, model, GPS coordinates, date taken, aperture, shutter speed, ISO, and more. 100% client-side, your images never leave your browser.",
  path: "/tools/image/exif-viewer",
  keywords: ["exif", "from", "date", "make", "metadata", "taken", "model", "extract", "view", "coordinates", "photos", "camera"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "EXIF Metadata Viewer",
    description: "View and extract EXIF metadata from photos — camera make, model, GPS coordinates, date taken, aperture, shutter speed, ISO, and more. 100% client-side, your images never leave your browser.",
    path: "/tools/image/exif-viewer",
    categoryName: "Image",
    categoryPath: "/tools/image",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ExifViewerClient />
    </div>
  );
}
