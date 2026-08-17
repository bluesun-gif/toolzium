import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import VisaCheckClient from "@/components/tools/travel/visa-check-client";

const TITLE = "Visa Requirements Checker | Toolzium";
const DESCRIPTION = "Check visa requirements and travel rules between countries.";
const PATH = "/tools/travel/visa-check";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Visa Requirements Checker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <VisaCheckClient />
    </>
  );
}
