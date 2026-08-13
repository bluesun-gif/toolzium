import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DiscordNameClient from "@/components/tools/social/discord-name-client";

export const metadata = buildMetadata({
  title: "Discord Server Name & Channel Layout Studio",
  description: "Generate aesthetic Discord server names, channel symbols (│・welcome), category headers, and role layouts.",
  path: "/tools/social/discord-name-generator",
  keywords: ["layouts", "aesthetic", "generate", "category", "names", "discord", "welcome", "channel", "headers", "role", "server", "symbols"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Discord Server Name & Channel Layout Studio",
    description: "Generate aesthetic Discord server names, channel symbols (│・welcome), category headers, and role layouts.",
    path: "/tools/social/discord-name-generator",
    categoryName: "Social",
    categoryPath: "/tools/social",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <DiscordNameClient />
    </div>
  );
}
