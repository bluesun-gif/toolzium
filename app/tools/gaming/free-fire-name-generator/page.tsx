import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FreeFireNameClient from "@/components/tools/gaming/free-fire-name-client";
import RelatedTools from "@/components/shared/related-tools";

export const metadata = buildMetadata({
  title: "Free Fire (FF) Nickname & Boss Squad Tag Studio",
  description: "Generate cool Free Fire nicknames, Boss style symbols, V.I.P tags, and invisible space characters for Garena Free Fire.",
  path: "/tools/gaming/free-fire-name-generator",
  keywords: ["invisible", "style", "nicknames", "generate", "space", "characters", "free", "boss", "fire", "tags", "symbols", "cool"],
});

<<<<<<< HEAD
export default function FreeFireNamePage() {
  return (
    <><FreeFireNameClient />
      <RelatedTools currentToolUrl="/tools/gaming/free-fire-name-generator" />
    </>
=======
export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Free Fire (FF) Nickname & Boss Squad Tag Studio",
    description: "Generate cool Free Fire nicknames, Boss style symbols, V.I.P tags, and invisible space characters for Garena Free Fire.",
    path: "/tools/gaming/free-fire-name-generator",
    categoryName: "Gaming",
    categoryPath: "/tools/gaming",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <FreeFireNameClient />
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
