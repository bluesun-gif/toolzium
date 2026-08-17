import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TravelChecklistClient from "@/components/tools/travel/checklist-client";

const TITLE = "Travel Checklist | Toolzium";
const DESCRIPTION = "Pre-trip checklist generator. Auto-generate categorized checklist.";
const PATH = "/tools/travel/checklist";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Travel Checklist",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TravelChecklistClient />
    </>
  );
}
