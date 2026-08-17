import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BloodPressureClient from "@/components/tools/health/blood-pressure-client";

const TITLE = "Blood Pressure Tracker | Toolzium";
const DESCRIPTION = "Track your blood pressure readings over time. Categorize readings and monitor trends.";
const PATH = "/tools/health/blood-pressure";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Blood Pressure Tracker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <BloodPressureClient />
    </>
  );
}
