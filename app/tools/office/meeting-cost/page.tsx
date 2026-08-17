import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MeetingCostClient from "@/components/tools/office/meeting-cost-client";

const TITLE = "Meeting Cost Calculator | Toolzium";
const DESCRIPTION = "Calculate how much a meeting costs based on attendees";
const PATH = "/tools/office/meeting-cost";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Meeting Cost Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MeetingCostClient />
    </>
  );
}
