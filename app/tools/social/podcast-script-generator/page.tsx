import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PodcastScriptGeneratorClient from "@/components/tools/social/podcast-script-generator-client";

const TITLE = "AI Podcast Episode Script & Show Notes Studio | Toolzium";
const DESCRIPTION = "Generate episode intro scripts, guest interview question frameworks, sponsor reads, and publishing show notes using live AI.";
const PATH = "/tools/social/podcast-script-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Podcast Episode Script & Show Notes Studio",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PodcastScriptGeneratorClient />
    </>
  );
}
