import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RobloxUsernameClient from "@/components/tools/gaming/roblox-username-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Roblox Username & Display Name Generator",
  description: "Generate cool, aesthetic, 4-letter rare, goth, and PvP Roblox usernames and display names with 1-click availability check.",
  path: "/tools/gaming/roblox-username-generator",
  keywords: ["aesthetic", "display", "goth", "letter", "generate", "rare", "names", "with", "roblox", "usernames", "click", "cool"],
});

export default function RobloxUsernamePage() {
  return (
    <><RobloxUsernameClient />
      <RelatedTools currentToolUrl="/tools/gaming/roblox-username-generator" />
    </>
  );
}
