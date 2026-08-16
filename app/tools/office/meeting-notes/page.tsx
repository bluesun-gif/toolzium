import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MeetingNotesClient from "@/components/tools/office/meeting-notes-client";
<<<<<<< HEAD
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import RelatedTools from "@/components/shared/related-tools";
=======
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

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
    
      <RelatedTools currentToolUrl="/tools/office/meeting-notes" />
</div>
  );
}
