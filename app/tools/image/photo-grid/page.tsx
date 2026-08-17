import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PhotoGridClient from "@/components/tools/image/photo-grid-client";

const TITLE = "Photo Grid Maker | Toolzium";
const DESCRIPTION = "Arrange multiple photos into a grid layout.";
const PATH = "/tools/image/photo-grid";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Photo Grid Maker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PhotoGridClient />
    </>
  );
}
