import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import YoutubeThumbnailClient from "@/components/tools/url/youtube-thumbnail-client";

const TITLE = "Youtube Thumbnail | Toolzium";
const DESCRIPTION = "Free online youtube thumbnail tool with instant calculation and privacy.";
const PATH = "/tools/url/youtube-thumbnail";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Youtube Thumbnail",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <YoutubeThumbnailClient />
    </>
  );
}
