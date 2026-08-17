import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import HydrationTrackerClient from "@/components/tools/health/hydration-tracker-client";

const TITLE = "Hydration & Daily Water Tracker | Toolzium";
const DESCRIPTION = "Track your daily water intake and calculate your optimal hydration goal based on weight and activity.";
const PATH = "/tools/health/hydration-tracker";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Hydration & Daily Water Tracker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <HydrationTrackerClient />
    </>
  );
}
