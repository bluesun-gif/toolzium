import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PodcastScriptGeneratorClient from "@/components/tools/social/podcast-script-generator-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "AI Podcast Episode Script & Show Notes Studio | Toolzium",
  description:
    "Generate episode intro scripts, guest interview question frameworks, sponsor reads, and publishing show notes using live AI.",
  path: "/tools/social/podcast-script-generator",
  keywords: [
    "podcast script generator",
    "podcast intro generator",
    "ai podcast writer",
    "podcast show notes",
    "podcast script ai",
    "episode script generator",
  ],
});

export default function PodcastScriptGeneratorPage() {
  return (
    <><PodcastScriptGeneratorClient />
      <RelatedTools currentToolUrl="/tools/social/podcast-script-generator" />
    </>
  );
}
