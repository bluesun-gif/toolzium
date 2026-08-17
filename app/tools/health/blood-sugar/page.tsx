import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BloodSugarClient from "@/components/tools/health/blood-sugar-client";

const TITLE = "Blood Sugar Tracker | Toolzium";
const DESCRIPTION = "Track and monitor your blood glucose readings over time with insights and averages.";
const PATH = "/tools/health/blood-sugar";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Blood Sugar Tracker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <BloodSugarClient />
    </>
  );
}
