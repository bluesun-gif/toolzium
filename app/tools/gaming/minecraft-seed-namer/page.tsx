import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MinecraftSeedClient from "@/components/tools/gaming/minecraft-seed-client";

const TITLE = "Minecraft Seed & World Name Generator";
const DESCRIPTION = "Generate fantasy Minecraft world titles, 100 Days Hardcore SMP names, and cottagecore village ideas.";
const PATH = "/tools/gaming/minecraft-seed-namer";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Minecraft Seed & World Name Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MinecraftSeedClient />
    </>
  );
}
