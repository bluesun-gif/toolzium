import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MeetingPlannerClient from "@/components/tools/time/meeting-planner-client";

const TITLE = "Time Zone Meeting Planner | Toolzium";
const DESCRIPTION = "Find the best meeting time across different time zones. Compare availability and schedule international meetings easily.";
const PATH = "/tools/time/meeting-planner";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Time Zone Meeting Planner",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MeetingPlannerClient />
    </>
  );
}
