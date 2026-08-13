import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MemoryCardMatchClient from "@/components/tools/fun/memory-card-match-client";

export const metadata = buildMetadata({
  title: "Memory Card Matching Game",
  description: "Interactive 3D memory card matching game. 4x4 & 6x6 grids, Emoji/Developer/Animal themes, move counter, timer, best scores.",
  path: "/tools/fun/memory-card-match",
  keywords: ["interactive", "matching", "memory", "card", "emoji", "move", "themes", "grids", "developer", "game", "counter", "animal"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Memory Card Matching Game",
    description: "Interactive 3D memory card matching game. 4x4 & 6x6 grids, Emoji/Developer/Animal themes, move counter, timer, best scores.",
    path: "/tools/fun/memory-card-match",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <MemoryCardMatchClient />
    </div>
  );
}
