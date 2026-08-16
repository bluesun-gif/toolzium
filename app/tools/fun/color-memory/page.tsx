import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ColorMemoryClient from "@/components/tools/fun/color-memory-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Color Memory Game",
  description: "Classic memory card matching game. Flip cards to find matching color pairs. Track moves and time. Easy, Medium, Hard difficulties. Best score saved.",
  path: "/tools/fun/color-memory",
  keywords: ["flip", "matching", "memory", "cards", "pairs", "card", "color", "track", "find", "game", "classic"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Color Memory Game",
    description: "Classic memory card matching game. Flip cards to find matching color pairs. Track moves and time. Easy, Medium, Hard difficulties. Best score saved.",
    path: "/tools/fun/color-memory",
    categoryName: "Fun",
    categoryPath: "/tools/fun",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <ColorMemoryClient />
    
      <RelatedTools currentToolUrl="/tools/fun/color-memory" />
</div>
  );
}
