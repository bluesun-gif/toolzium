import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WorkHoursClient from "@/components/tools/time/work-hours-client";

const TITLE = "Work Hours & Overtime Calculator | Toolzium";
const DESCRIPTION = "Calculate daily and weekly work hours including break deductions and overtime.";
const PATH = "/tools/time/work-hours";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Work Hours & Overtime Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <WorkHoursClient />
    </>
  );
}
