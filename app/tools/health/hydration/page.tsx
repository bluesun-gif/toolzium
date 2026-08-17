import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import HydrationClient from "@/components/tools/health/hydration-client";

const TITLE = "Hydration Reminder | Toolzium";
const DESCRIPTION = "Track daily water intake with visual progress.";
const PATH = "/tools/health/hydration";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Hydration Reminder",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <HydrationClient />
    </>
  );
}
