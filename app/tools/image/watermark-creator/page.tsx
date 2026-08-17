import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WatermarkCreatorClient from "@/components/tools/image/watermark-creator-client";

const TITLE = "Image Watermark Creator | Toolzium";
const DESCRIPTION = "Add text or image watermarks to your photos easily and download them in high quality.";
const PATH = "/tools/image/watermark-creator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Image Watermark Creator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <WatermarkCreatorClient />
    </>
  );
}
