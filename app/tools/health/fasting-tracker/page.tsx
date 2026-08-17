import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FastingTrackerClient from "@/components/tools/health/fasting-tracker-client";

const TITLE = "Intermittent Fasting Tracker | Toolzium";
const DESCRIPTION = "Track intermittent fasting protocols, monitor fasting state, and log history.";
const PATH = "/tools/health/fasting-tracker";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Intermittent Fasting Tracker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <FastingTrackerClient />
    </>
  );
}
