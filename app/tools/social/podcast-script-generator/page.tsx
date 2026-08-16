import { Metadata } from "next";
import PodcastScriptGeneratorClient from "@/components/tools/social/podcast-script-generator-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = {
  title: "AI Podcast Episode Script & Show Notes Studio | Toolzium",
  description:
    "Generate episode intro scripts, guest interview question frameworks, sponsor reads, and publishing show notes using live AI.",
};

export default function PodcastScriptGeneratorPage() {
  return (
    <><PodcastScriptGeneratorClient />
      <RelatedTools currentToolUrl="/tools/social/podcast-script-generator" />
    </>
  );
}
