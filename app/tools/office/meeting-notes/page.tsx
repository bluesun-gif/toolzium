import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MeetingNotesClient from "@/components/tools/office/meeting-notes-client";

export const metadata = buildMetadata({
  title: "Meeting Notes Template",
  description: "Take structured meeting notes with timestamps and action items. Meeting minutes template for recording discussions, decisions, and next steps. Export notes as text or PDF.",
  path: "/tools/office/meeting-notes",
  keywords: ["recording", "with", "items", "action", "notes", "template", "structured", "take", "meeting", "timestamps", "minutes"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Meeting Notes Template",
    description: "Take structured meeting notes with timestamps and action items. Meeting minutes template for recording discussions, decisions, and next steps. Export notes as text or PDF.",
    path: "/tools/office/meeting-notes",
    categoryName: "Office",
    categoryPath: "/tools/office",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <MeetingNotesClient />
    </div>
  );
}
