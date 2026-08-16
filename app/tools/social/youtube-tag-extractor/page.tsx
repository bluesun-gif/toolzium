import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import YoutubeTagClient from "@/components/tools/social/youtube-tag-client";
import RelatedTools from "@/components/shared/related-tools";

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
  return (
    <><YoutubeTagClient />
      <RelatedTools currentToolUrl="/tools/social/youtube-tag-extractor" />
    </>
  );
}
