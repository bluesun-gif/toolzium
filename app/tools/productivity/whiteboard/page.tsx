import JsonLd from "@/components/seo/json-ld";
<<<<<<< HEAD
import RelatedTools from "@/components/shared/related-tools";
=======
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WhiteboardClient from "@/components/tools/productivity/whiteboard-client";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

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
<<<<<<< HEAD
    
      <RelatedTools currentToolUrl="/tools/productivity/whiteboard" />
</>
=======
    </div>
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
  );
}
