import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SocialBioClient from "@/components/tools/ai/social-bio-client";

const TITLE = "AI Social Media Bio & Creator Profile Generator Studio | Toolzium";
const DESCRIPTION = "Generate high-converting, aesthetic bios for Instagram, TikTok, Twitter/X, and LinkedIn with 1-click vibe controls.";
const PATH = "/tools/ai/social-bio";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Social Media Bio & Creator Profile Generator Studio",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SocialBioClient />
    </>
  );
}
