import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TwitchTitleClient from "@/components/tools/social/twitch-title-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Twitch Stream Title & High-CTR Hook Generator",
  description: "Generate high-converting Twitch stream titles, viewer engagement hooks, and command tags for Valorant, GTA V, Minecraft, and Just Chatting.",
  path: "/tools/social/twitch-title-generator",
  keywords: ["hooks", "engagement", "generate", "stream", "valorant", "command", "titles", "converting", "viewer", "twitch", "high", "tags"],
});

export default function TwitchTitlePage() {
  return (
    <><TwitchTitleClient />
      <RelatedTools currentToolUrl="/tools/social/twitch-title-generator" />
    </>
  );
}
