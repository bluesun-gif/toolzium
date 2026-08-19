import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TravelChecklistClient from "@/components/tools/travel/checklist-client";

const TITLE = "Travel Packing Checklist | Toolzium";
const DESCRIPTION = "Never forget anything when packing. Smart travel packing checklists for beach, business, winter, and backpacking trips. Free, customizable.";
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
