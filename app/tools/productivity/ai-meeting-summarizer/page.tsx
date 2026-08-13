import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiMeetingSummarizerClient from "@/components/tools/productivity/ai-meeting-summarizer-client";

export const metadata = buildMetadata({
  title: "AI Executive Meeting Notes & Action Item Summarizer",
  description: "Transform raw meeting transcripts, Zoom notes, and Slack huddle logs into executive summaries and action items with live AI.",
  path: "/tools/productivity/ai-meeting-summarizer",
  keywords: ["summaries", "slack", "zoom", "into", "action", "notes", "executive", "logs", "huddle", "transform", "meeting", "transcripts"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Executive Meeting Notes & Action Item Summarizer",
    description: "Transform raw meeting transcripts, Zoom notes, and Slack huddle logs into executive summaries and action items with live AI.",
    path: "/tools/productivity/ai-meeting-summarizer",
    categoryName: "Productivity",
    categoryPath: "/tools/productivity",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <AiMeetingSummarizerClient />
    </div>
  );
}
