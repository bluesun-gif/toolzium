import { Metadata } from "next";
import YoutubeTagClient from "@/components/tools/social/youtube-tag-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = {
  title: "YouTube Video Tag & High-SEO Keyword Extractor | Toolzium",
  description:
    "Extract and generate high-ranking, SEO-optimized tags and viral keywords for YouTube videos with live AI inference.",
};

export default function YoutubeTagPage() {
  return (
    <><YoutubeTagClient />
      <RelatedTools currentToolUrl="/tools/social/youtube-tag-extractor" />
    </>
  );
}
