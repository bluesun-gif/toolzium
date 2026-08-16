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

<<<<<<< HEAD
export default function DiscordNamePage() {
  return (
    <><DiscordNameClient />
      <RelatedTools currentToolUrl="/tools/social/discord-name-generator" />
    </>
=======
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
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
