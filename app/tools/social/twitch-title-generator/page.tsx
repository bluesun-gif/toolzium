import { Metadata } from "next";
import TwitchTitleClient from "@/components/tools/social/twitch-title-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata: Metadata = {
  title: "Twitch Stream Title & High-CTR Hook Generator | Toolzium",
  description:
    "Generate high-converting Twitch stream titles, viewer engagement hooks, and command tags for Valorant, GTA V, Minecraft, and Just Chatting.",
};

export default function TwitchTitlePage() {
  return (
    <><TwitchTitleClient />
      <RelatedTools currentToolUrl="/tools/social/twitch-title-generator" />
    </>
  );
}
