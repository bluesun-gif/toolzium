import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RobloxUsernameClient from "@/components/tools/gaming/roblox-username-client";

export const metadata = buildMetadata({
  title: "Roblox Username & Display Name Generator",
  description: "Generate cool, aesthetic, 4-letter rare, goth, and PvP Roblox usernames and display names with 1-click availability check.",
  path: "/tools/gaming/roblox-username-generator",
  keywords: ["aesthetic", "display", "goth", "letter", "generate", "rare", "names", "with", "roblox", "usernames", "click", "cool"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Roblox Username & Display Name Generator",
    description: "Generate cool, aesthetic, 4-letter rare, goth, and PvP Roblox usernames and display names with 1-click availability check.",
    path: "/tools/gaming/roblox-username-generator",
    categoryName: "Gaming",
    categoryPath: "/tools/gaming",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <RobloxUsernameClient />
    </div>
  );
}
