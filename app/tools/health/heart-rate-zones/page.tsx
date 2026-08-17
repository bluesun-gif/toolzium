import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import HeartRateZonesClient from "@/components/tools/health/heart-rate-zones-client";

const TITLE = "Heart Rate Zone Calculator | Toolzium";
const DESCRIPTION = "Calculate your optimal heart rate training zones based on your age and resting heart rate.";
const PATH = "/tools/health/heart-rate-zones";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Heart Rate Zone Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <HeartRateZonesClient />
    </>
  );
}
