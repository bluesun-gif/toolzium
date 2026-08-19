import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import VisaIndexClient from "@/components/tools/travel/visa-index-client";

const TITLE = "Passport Visa Index | Toolzium";
const DESCRIPTION = "Check your passport's global power and see which countries you can visit visa-free. Interactive world map with 190+ passport rankings. Free.";
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
