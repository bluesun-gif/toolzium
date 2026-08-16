import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import YoutubeScriptGeneratorClient from "@/components/tools/social/youtube-script-generator-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "AI YouTube Video Script & Outline Generator — Free Retention Script Writer",
  description:
    "Generate high-retention 5-second opening hooks, B-roll cues, step-by-step value scripts, and high-CTR calls to action using live AI.",
  path: "/tools/social/youtube-script-generator",
  keywords: [
    "youtube script generator",
    "ai youtube script writer",
    "video outline generator",
    "high retention youtube script",
    "youtube video hook generator",
  ],
});

export default function YoutubeScriptGeneratorPage() {
  return (
    <><YoutubeScriptGeneratorClient />
      <RelatedTools currentToolUrl="/tools/social/youtube-script-generator" />
    </>
  );
}
