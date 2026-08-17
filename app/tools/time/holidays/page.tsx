import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import HolidaysClient from "@/components/tools/time/holidays-client";

const TITLE = "Holiday Calendar | Toolzium";
const DESCRIPTION = "View and filter public holidays by country and year. See upcoming holidays and count downs.";
const PATH = "/tools/time/holidays";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Holiday Calendar",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <HolidaysClient />
    </>
  );
}
