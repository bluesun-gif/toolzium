import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import YoutubeScriptGeneratorClient from "@/components/tools/social/youtube-script-generator-client";

const TITLE = "YouTube Script Generator | Toolzium";
const DESCRIPTION = "Generate complete YouTube video scripts using AI. Get hook, intro, main content, and outro for any topic and video length. Free, instant.";
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
