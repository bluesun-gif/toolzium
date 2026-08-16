import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import VideoRatioClient from "@/components/tools/calc/video-ratio-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Video Aspect Ratio Calculator",
  description: "Calculate video aspect ratios and resolutions. Presets for 4K, 1080p, 720p, Instagram, TikTok, YouTube Shorts. Scale calculator maintains ratio. Shows pixel count and megapixels.",
  path: "/tools/calc/video-ratio",
  keywords: ["tiktok", "youtube", "resolutions", "calculate", "shorts", "presets", "scale", "calculator", "instagram", "video", "ratios", "aspect"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Video Aspect Ratio Calculator",
    description: "Calculate video aspect ratios and resolutions. Presets for 4K, 1080p, 720p, Instagram, TikTok, YouTube Shorts. Scale calculator maintains ratio. Shows pixel count and megapixels.",
    path: "/tools/calc/video-ratio",
    categoryName: "Calc",
    categoryPath: "/tools/calc",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <VideoRatioClient />
    
      <RelatedTools currentToolUrl="/tools/calc/video-ratio" />
</div>
  );
}
