import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import YoutubeThumbnailClient from "@/components/tools/url/youtube-thumbnail-client";

const TITLE = "Free YouTube Thumbnail Downloader - Download 4K & HD (1080p) Thumbnails";
const DESCRIPTION =
  "Download YouTube video thumbnails in Maximum HD (1080p), 720p, and 480p resolution. Free YouTube thumbnail grabber supporting YouTube Shorts, standard videos, and AI CTR design audits.";
const PATH = "/tools/url/youtube-thumbnail";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "youtube thumbnail downloader",
    "download youtube thumbnail",
    "youtube thumbnail grabber",
    "get youtube thumbnail",
    "youtube thumbnail hd 1080p",
    "youtube shorts thumbnail downloader",
    "save youtube thumbnail",
    "youtube thumbnail 4k",
    "extract youtube thumbnail",
  ],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Free YouTube Thumbnail Downloader & HD Grabber Studio",
    description: DESCRIPTION,
    path: PATH,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <YoutubeThumbnailClient />
    </>
  );
}
