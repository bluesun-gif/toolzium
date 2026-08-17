import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WatermarkClient from "@/components/tools/image/watermark-client";

const TITLE = "Image Watermark Tool | Toolzium";
const DESCRIPTION = "Add text watermarks to your images easily. Customize font, color, opacity, and position.";
const PATH = "/tools/image/watermark";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Image Watermark Tool",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <WatermarkClient />
    </>
  );
}
