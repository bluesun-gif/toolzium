import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MeetingAgendaClient from "@/components/tools/productivity/meeting-agenda-client";

const TITLE = "Meeting Agenda Builder | Toolzium";
const DESCRIPTION = "Create and structure meeting agendas. Keep track of topics, presenters, and time allocations to run effective meetings.";
const PATH = "/tools/productivity/meeting-agenda";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Meeting Agenda Builder",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MeetingAgendaClient />
    </>
  );
}
