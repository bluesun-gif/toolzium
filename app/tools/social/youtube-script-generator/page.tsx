import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import YoutubeScriptGeneratorClient from "@/components/tools/social/youtube-script-generator-client";

const TITLE = "AI YouTube Video Script & Outline Generator — Free Retention Script Writer";
const DESCRIPTION = "Generate high-retention 5-second opening hooks, B-roll cues, step-by-step value scripts, and high-CTR calls to action using live AI.";
const PATH = "/tools/social/youtube-script-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI YouTube Video Script & Outline Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <YoutubeScriptGeneratorClient />
    </>
  );
}
