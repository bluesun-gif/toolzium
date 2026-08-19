import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PodcastScriptGeneratorClient from "@/components/tools/social/podcast-script-generator-client";

const TITLE = "Podcast Script Generator | Toolzium";
const DESCRIPTION = "Generate complete podcast episode scripts using AI. Get structured scripts with intro, segments, and outro for any topic. Free, instant.";
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
