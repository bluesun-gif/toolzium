import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WhiteboardClient from "@/components/tools/productivity/whiteboard-client";

export const metadata = buildMetadata({
  title: "Online Whiteboard",
  description: "Free online whiteboard and drawing tool. Freehand drawing, shapes, colors, brush sizes, undo/redo, and export as PNG. Perfect for brainstorming, diagrams, and quick sketches. Works in your browser.",
  path: "/tools/productivity/whiteboard",
  keywords: ["sizes", "drawing", "whiteboard", "colors", "online", "free", "shapes", "freehand", "brush", "undo", "tool"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Online Whiteboard",
    description: "Free online whiteboard and drawing tool. Freehand drawing, shapes, colors, brush sizes, undo/redo, and export as PNG. Perfect for brainstorming, diagrams, and quick sketches. Works in your browser.",
    path: "/tools/productivity/whiteboard",
    categoryName: "Productivity",
    categoryPath: "/tools/productivity",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <WhiteboardClient />
    </div>
  );
}
