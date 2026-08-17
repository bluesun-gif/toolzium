import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AllergyTrackerClient from "@/components/tools/health/allergy-tracker-client";

const TITLE = "Allergy Tracker | Toolzium";
const DESCRIPTION = "Track allergies and reactions with our free online allergy tracker tool.";
const PATH = "/tools/health/allergy-tracker";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Allergy Tracker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AllergyTrackerClient />
    </>
  );
}
