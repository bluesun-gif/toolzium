import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SteamBioClient from "@/components/tools/gaming/steam-bio-client";

const TITLE = "Steam Profile Bio & Layout Decorator";
const DESCRIPTION = "Generate aesthetic Steam profile bios, hardware spec boxes, CS2/Dota 2 rank tags, and custom artwork spacers.";
const PATH = "/tools/gaming/steam-bio-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Steam Profile Bio & Layout Decorator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SteamBioClient />
    </>
  );
}
