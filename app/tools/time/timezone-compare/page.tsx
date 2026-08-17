import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TimezoneCompareClient from "@/components/tools/time/timezone-compare-client";

const TITLE = "Compare Time Zones — Free World Clock & Timezone Converter (2026) | Toolzium";
const DESCRIPTION = "Compare local time across multiple time zones side by side. Easily schedule meetings between EST, PST, GMT, UTC, IST, and CET with instant DST awareness.";
const PATH = "/tools/time/timezone-compare";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Compare Time Zones",
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
