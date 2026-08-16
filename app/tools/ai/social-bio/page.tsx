import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SocialBioClient from "@/components/tools/ai/social-bio-client";
export const metadata = {
  title: "AI Social Media Bio & Creator Profile Generator Studio | Toolzium",
  description: "Generate high-converting, aesthetic bios for Instagram, TikTok, Twitter/X, and LinkedIn with 1-click vibe controls.",
};

export default function SocialBioPage() {
  return (
    <><SocialBioClient />
      <RelatedTools currentToolUrl="/tools/ai/social-bio" />
    </>
  );
}
