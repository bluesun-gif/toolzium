import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DiscordNameClient from "@/components/tools/social/discord-name-client";

const TITLE = "Discord Server Name & Channel Layout Studio";
const DESCRIPTION = "Generate aesthetic Discord server names, channel symbols (│・welcome), category headers, and role layouts.";
const PATH = "/tools/social/discord-name-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Discord Server Name & Channel Layout Studio",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <DiscordNameClient />
    </>
  );
}
