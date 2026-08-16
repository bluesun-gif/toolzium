import { Metadata } from "next";
import AiMeetingSummarizerClient from "@/components/tools/productivity/ai-meeting-summarizer-client";
export const metadata: Metadata = {
  title: "AI Executive Meeting Notes & Action Item Summarizer | Toolzium",
  description:
    "Transform raw meeting transcripts, Zoom notes, and Slack huddle logs into executive summaries and action items with live AI.",
};

export default function AiMeetingSummarizerPage() {
  return (
    <><AiMeetingSummarizerClient />
      <RelatedTools currentToolUrl="/tools/productivity/ai-meeting-summarizer" />
    </>
  );
}
