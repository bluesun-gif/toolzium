import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import InstagramReelClient from "@/components/tools/social/instagram-reel-client";

const TITLE = "Instagram Reel Hook & Viral Caption Generator";
const DESCRIPTION = "Generate 3-second high-curiosity opening hooks and viral captions for Instagram Reels with live AI inference.";
const PATH = "/tools/social/instagram-reel-hooks";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Instagram Reel Hook & Viral Caption Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <InstagramReelClient />
    </>
  );
}
