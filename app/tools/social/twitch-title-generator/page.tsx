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

<<<<<<< HEAD
export default function TwitchTitlePage() {
  return (
    <><TwitchTitleClient />
      <RelatedTools currentToolUrl="/tools/social/twitch-title-generator" />
    </>
=======
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
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
