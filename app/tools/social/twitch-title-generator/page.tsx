import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TwitchTitleClient from "@/components/tools/social/twitch-title-client";

const TITLE = "Twitch Stream Title & High-CTR Hook Generator";
const DESCRIPTION = "Generate high-converting Twitch stream titles, viewer engagement hooks, and command tags for Valorant, GTA V, Minecraft, and Just Chatting.";
const PATH = "/tools/social/twitch-title-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Twitch Stream Title & High-CTR Hook Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TwitchTitleClient />
    </>
  );
}
