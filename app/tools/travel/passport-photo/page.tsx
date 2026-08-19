import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PassportPhotoClient from "@/components/tools/travel/passport-photo-client";

const TITLE = "Passport Photo Maker | Toolzium";
const DESCRIPTION = "Create passport photos meeting official requirements for 190+ countries. Free alternative to expensive photo booth services. Download and print.";
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
