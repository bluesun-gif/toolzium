import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import YoutubeTagClient from "@/components/tools/social/youtube-tag-client";
import { siteURL } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "YouTube Video Tag & High-SEO Keyword Extractor | Toolzium",
  description:
    "Extract and generate high-ranking, SEO-optimized tags and viral keywords for YouTube videos with live AI inference.",
  path: "/tools/social/youtube-tag-extractor",
  keywords: [
    "youtube tag generator",
    "youtube seo tags",
    "youtube keyword extractor",
    "youtube tag extractor",
    "seo tags for youtube",
    "youtube video tags",
    "ai tag generator",
    "youtube seo tools",
  ],
});

export default function YoutubeTagPage() {
  const toolUrl = `${siteURL}/tools/social/youtube-tag-extractor`;

  const jsonLd = buildToolJsonLd({
    name: "YouTube Tag Extractor",
    description:
      "Extract and generate high-ranking, SEO-optimized tags and viral keywords for YouTube videos with live AI inference.",
    path: "/tools/social/youtube-tag-extractor",
    categoryName: "Social Media Tools",
    categoryPath: "/tools/social",
  });

  return (
    <div className="space-y-4">
      <JsonLd data={jsonLd[0]} />
      <JsonLd data={jsonLd[1]} />
      <JsonLd data={jsonLd[2]} />
      <YoutubeTagClient />
    </div>
  );
}
