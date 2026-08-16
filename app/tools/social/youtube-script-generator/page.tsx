import { Metadata } from "next";
import YoutubeScriptGeneratorClient from "@/components/tools/social/youtube-script-generator-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = {
  title: "AI YouTube Video Script & Outline Generator | Toolzium",
  description:
    "Generate high-retention 5-second opening hooks, B-roll cues, step-by-step value scripts, and high-CTR calls to action using live AI.",
};

export default function YoutubeScriptGeneratorPage() {
  return (
    <><YoutubeScriptGeneratorClient />
      <RelatedTools currentToolUrl="/tools/social/youtube-script-generator" />
    </>
  );
}
