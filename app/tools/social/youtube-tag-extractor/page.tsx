import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import YoutubeTagClient from "@/components/tools/social/youtube-tag-client";

const TITLE = "YouTube Video Tag & High-SEO Keyword Extractor | Toolzium";
const DESCRIPTION = "Extract and generate high-ranking, SEO-optimized tags and viral keywords for YouTube videos with live AI inference.";
const PATH = "/tools/social/youtube-tag-extractor";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "YouTube Video Tag & High-SEO Keyword Extractor",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <YoutubeTagClient />
    </>
  );
}
