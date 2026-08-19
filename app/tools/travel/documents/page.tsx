import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TravelDocumentsClient from "@/components/tools/travel/documents-client";

const TITLE = "Travel Documents Checklist | Toolzium";
const DESCRIPTION = "Get a complete travel documents checklist for any destination — visa, passport, insurance, and more. Requirements for 190+ countries. Free.";
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
