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

<<<<<<< HEAD
export default function RobloxUsernamePage() {
  return (
    <><RobloxUsernameClient />
      <RelatedTools currentToolUrl="/tools/gaming/roblox-username-generator" />
    </>
=======
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
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
