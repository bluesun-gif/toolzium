import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ShiftSchedulerClient from "@/components/tools/time/shift-scheduler-client";

const TITLE = "Work Shift Scheduler | Toolzium";
const DESCRIPTION = "Schedule employee work shifts.";
const PATH = "/tools/time/shift-scheduler";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Work Shift Scheduler",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ShiftSchedulerClient />
    </>
  );
}
