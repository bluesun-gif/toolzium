import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AspectCropperClient from "@/components/tools/image/aspect-cropper-client";

const TITLE = "Image Aspect Ratio Cropper | Toolzium";
const DESCRIPTION = "Crop images to exact aspect ratios for social media and web.";
const PATH = "/tools/image/aspect-cropper";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Image Aspect Ratio Cropper",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AspectCropperClient />
    </>
  );
}
