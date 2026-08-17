import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TimezoneCompareClient from "@/components/tools/time/timezone-compare-client";

const TITLE = "Timezone | Toolzium";
const DESCRIPTION = "Free online timezone tool with instant calculation and privacy.";
const PATH = "/tools/time/timezone";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Timezone",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TimezoneCompareClient />
    </>
  );
}
