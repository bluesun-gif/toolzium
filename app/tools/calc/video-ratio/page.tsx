import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import VideoRatioClient from "@/components/tools/calc/video-ratio-client";

const TITLE = "Video Ratio | Toolzium";
const DESCRIPTION = "Free online video ratio tool with instant calculation and privacy.";
const PATH = "/tools/calc/video-ratio";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Video Ratio",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <VideoRatioClient />
    </>
  );
}
