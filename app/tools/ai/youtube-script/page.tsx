import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import YoutubeScriptClient from "@/components/tools/ai/youtube-script-client";

const TITLE = "AI YouTube Script Generator & Teleprompter Studio | Toolzium";
const DESCRIPTION = "Generate viral YouTube video titles, 15-second opening retention hooks, video timestamp outlines, and teleprompter-ready scripts.";
const PATH = "/tools/ai/youtube-script";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI YouTube Script Generator & Teleprompter Studio",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <YoutubeScriptClient />
    </>
  );
}
