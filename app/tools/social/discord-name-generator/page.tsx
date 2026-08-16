import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DiscordNameClient from "@/components/tools/social/discord-name-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Discord Server Name & Channel Layout Studio",
  description: "Generate aesthetic Discord server names, channel symbols (│・welcome), category headers, and role layouts.",
  path: "/tools/social/discord-name-generator",
  keywords: ["layouts", "aesthetic", "generate", "category", "names", "discord", "welcome", "channel", "headers", "role", "server", "symbols"],
});

export default function DiscordNamePage() {
  return (
    <><DiscordNameClient />
      <RelatedTools currentToolUrl="/tools/social/discord-name-generator" />
    </>
  );
}
