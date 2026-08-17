import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MeetingNotesClient from "@/components/tools/office/meeting-notes-client";

const TITLE = "Meeting Notes | Toolzium";
const DESCRIPTION = "Free online meeting notes tool with instant calculation and privacy.";
const PATH = "/tools/office/meeting-notes";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Meeting Notes",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MeetingNotesClient />
    </>
  );
}
