import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import VideoDownloaderClient from "@/components/tools/social/video-downloader-client";

const TITLE = "Video Downloader | Toolzium";
const DESCRIPTION = "Free online video downloader tool with instant calculation and privacy.";
const PATH = "/tools/social/video-downloader";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Video Downloader",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <VideoDownloaderClient />
    </>
  );
}
