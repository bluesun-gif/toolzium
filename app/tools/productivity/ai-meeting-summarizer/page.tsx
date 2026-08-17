import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AiMeetingSummarizerClient from "@/components/tools/productivity/ai-meeting-summarizer-client";

const TITLE = "AI Executive Meeting Notes & Action Item Summarizer | Toolzium";
const DESCRIPTION = "Transform raw meeting transcripts, Zoom notes, and Slack huddle logs into executive summaries and action items with live AI.";
const PATH = "/tools/productivity/ai-meeting-summarizer";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Executive Meeting Notes & Action Item Summarizer",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AiMeetingSummarizerClient />
    </>
  );
}
