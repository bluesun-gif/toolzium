import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PassportPhotoClient from "@/components/tools/travel/passport-photo-client";

const TITLE = "Passport Photo Crop & Grid | Toolzium";
const DESCRIPTION = "Format photos for passport & visa applications with printable grids.";
const PATH = "/tools/travel/passport-photo";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Passport Photo Crop & Grid",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PassportPhotoClient />
    </>
  );
}
