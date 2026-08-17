import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TiktokCaptionClient from "@/components/tools/social/tiktok-caption-client";

const TITLE = "TikTok Viral Caption & Hashtag Hook Studio | Toolzium";
const DESCRIPTION = "Generate high-converting TikTok captions, viral opening hooks, storytime openers, and trending hashtag clusters.";
const PATH = "/tools/social/tiktok-caption-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "TikTok Viral Caption & Hashtag Hook Studio",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TiktokCaptionClient />
    </>
  );
}
