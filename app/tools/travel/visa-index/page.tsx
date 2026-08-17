import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import VisaIndexClient from "@/components/tools/travel/visa-index-client";

const TITLE = "Travel Visa Requirements Index | Toolzium";
const DESCRIPTION = "Check visa requirements and travel restrictions based on your passport.";
const PATH = "/tools/travel/visa-index";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Travel Visa Requirements Index",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <VisaIndexClient />
    </>
  );
}
