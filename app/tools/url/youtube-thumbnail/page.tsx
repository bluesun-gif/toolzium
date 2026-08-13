import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import YoutubeThumbnailClient from "@/components/tools/url/youtube-thumbnail-client";

export const metadata = buildMetadata({
  title: "YouTube Thumbnail Downloader",
  description: "Download high-resolution YouTube video thumbnails for free online. Support max resolution, standard, and medium qualities. Just paste the YouTube video link and download.",
  path: "/tools/url/youtube-thumbnail",
  keywords: ["download", "youtube", "resolution", "online", "free", "medium", "video", "high", "standard", "support", "thumbnails"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "YouTube Thumbnail Downloader",
    description: "Download high-resolution YouTube video thumbnails for free online. Support max resolution, standard, and medium qualities. Just paste the YouTube video link and download.",
    path: "/tools/url/youtube-thumbnail",
    categoryName: "Url",
    categoryPath: "/tools/url",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <YoutubeThumbnailClient />
    </div>
  );
}
