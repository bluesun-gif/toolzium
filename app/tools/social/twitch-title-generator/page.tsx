import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TwitchTitleClient from "@/components/tools/social/twitch-title-client";

export const metadata = buildMetadata({
  title: "Twitch Stream Title & High-CTR Hook Generator",
  description: "Generate high-converting Twitch stream titles, viewer engagement hooks, and command tags for Valorant, GTA V, Minecraft, and Just Chatting.",
  path: "/tools/social/twitch-title-generator",
  keywords: ["hooks", "engagement", "generate", "stream", "valorant", "command", "titles", "converting", "viewer", "twitch", "high", "tags"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Twitch Stream Title & High-CTR Hook Generator",
    description: "Generate high-converting Twitch stream titles, viewer engagement hooks, and command tags for Valorant, GTA V, Minecraft, and Just Chatting.",
    path: "/tools/social/twitch-title-generator",
    categoryName: "Social",
    categoryPath: "/tools/social",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <TwitchTitleClient />
    </div>
  );
}
