import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MetadataCleanerClient from "@/components/tools/image/metadata-cleaner-client";

const TITLE = "Image Privacy & EXIF Cleaner | Toolzium";
const DESCRIPTION = "Remove EXIF metadata, GPS coordinates, and camera info from images to protect your privacy before sharing online.";
const PATH = "/tools/image/metadata-cleaner";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Image Privacy & EXIF Cleaner",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MetadataCleanerClient />
    </>
  );
}
