import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TimesheetClient from "@/components/tools/office/timesheet-client";

const TITLE = "Timesheet Calculator | Toolzium";
const DESCRIPTION = "Calculate weekly work hours, track overtime, and estimate gross pay with our free online timesheet calculator.";
const PATH = "/tools/office/timesheet";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Timesheet Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TimesheetClient />
    </>
  );
}
