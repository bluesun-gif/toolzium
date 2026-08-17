import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TravelDocumentsClient from "@/components/tools/travel/documents-client";

const TITLE = "Travel Document Checklist | Toolzium";
const DESCRIPTION = "Comprehensive travel document checklist for any type of trip.";
const PATH = "/tools/travel/documents";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Travel Document Checklist",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TravelDocumentsClient />
    </>
  );
}
