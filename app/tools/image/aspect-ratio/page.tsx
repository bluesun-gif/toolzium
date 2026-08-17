import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AspectRatioClient from "@/components/tools/image/aspect-ratio-client";

const TITLE = "Aspect Ratio Calculator | Toolzium";
const DESCRIPTION = "Calculate aspect ratios for images and video. Find dimensions for common presets like 16:9, 4:3, and social media sizes.";
const PATH = "/tools/image/aspect-ratio";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Aspect Ratio Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AspectRatioClient />
    </>
  );
}
