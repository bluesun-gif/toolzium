import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SalaryHourlyClient from "@/components/tools/finance/salary-hourly-client";

const TITLE = "Salary Hourly | Toolzium";
const DESCRIPTION = "Free online salary hourly tool with instant calculation and privacy.";
const PATH = "/tools/finance/salary-hourly";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Salary Hourly",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SalaryHourlyClient />
    </>
  );
}
