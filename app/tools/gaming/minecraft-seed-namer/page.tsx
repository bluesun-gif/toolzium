import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MinecraftSeedClient from "@/components/tools/gaming/minecraft-seed-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Minecraft Seed & World Name Generator",
  description: "Generate fantasy Minecraft world titles, 100 Days Hardcore SMP names, and cottagecore village ideas.",
  path: "/tools/gaming/minecraft-seed-namer",
  keywords: ["minecraft", "generate", "village", "names", "ideas", "fantasy", "titles", "days", "hardcore", "cottagecore", "world"],
});

<<<<<<< HEAD
export default function MinecraftSeedPage() {
  return (
    <><MinecraftSeedClient />
      <RelatedTools currentToolUrl="/tools/gaming/minecraft-seed-namer" />
    </>
=======
export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Minecraft Seed & World Name Generator",
    description: "Generate fantasy Minecraft world titles, 100 Days Hardcore SMP names, and cottagecore village ideas.",
    path: "/tools/gaming/minecraft-seed-namer",
    categoryName: "Gaming",
    categoryPath: "/tools/gaming",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <MinecraftSeedClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
