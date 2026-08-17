import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TzAlarmClient from "@/components/tools/time/tz-alarm-client";

const TITLE = "Timezone Alarm | Toolzium";
const DESCRIPTION = "Set and manage alarms across different timezones.";
const PATH = "/tools/time/tz-alarm";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Timezone Alarm",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TzAlarmClient />
    </>
  );
}
