import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BloodTypeClient from "@/components/tools/health/blood-type-client";

const TITLE = "Blood Type Compatibility Checker | Toolzium";
const DESCRIPTION = "Check blood type compatibility for donation and receiving. See universal donors and recipients.";
const PATH = "/tools/health/blood-type";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Blood Type Compatibility Checker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <BloodTypeClient />
    </>
  );
}
