import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiActionItemsClient from "@/components/tools/productivity/ai-action-items-client";

export const metadata = buildMetadata({
  title: "AI Meeting Action Items Extractor Studio",
  description: "Convert raw meeting transcripts and notes into clear owner assignments, deadlines, and task cards using live AI.",
  path: "/tools/productivity/ai-action-items",
  keywords: ["assignments", "into", "cards", "clear", "convert", "notes", "using", "owner", "task", "meeting", "deadlines", "transcripts"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Meeting Action Items Extractor Studio",
    description: "Convert raw meeting transcripts and notes into clear owner assignments, deadlines, and task cards using live AI.",
    path: "/tools/productivity/ai-action-items",
    categoryName: "Productivity",
    categoryPath: "/tools/productivity",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <AiActionItemsClient />
    </div>
  );
}
