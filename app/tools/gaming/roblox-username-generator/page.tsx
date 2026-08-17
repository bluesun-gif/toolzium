import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RobloxUsernameClient from "@/components/tools/gaming/roblox-username-client";

const TITLE = "Roblox Username & Display Name Generator";
const DESCRIPTION = "Generate cool, aesthetic, 4-letter rare, goth, and PvP Roblox usernames and display names with 1-click availability check.";
const PATH = "/tools/gaming/roblox-username-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Roblox Username & Display Name Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <RobloxUsernameClient />
    </>
  );
}
