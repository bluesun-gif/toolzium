import { Metadata } from "next";
import AiActionItemsClient from "@/components/tools/productivity/ai-action-items-client";
export const metadata: Metadata = {
  title: "AI Meeting Action Items Extractor Studio | Toolzium",
  description:
    "Convert raw meeting transcripts and notes into clear owner assignments, deadlines, and task cards using live AI.",
};

export default function AiActionItemsPage() {
  return (
    <><AiActionItemsClient />
      <RelatedTools currentToolUrl="/tools/productivity/ai-action-items" />
    </>
  );
}
