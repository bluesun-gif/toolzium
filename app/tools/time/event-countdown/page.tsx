import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EventCountdownClient from "@/components/tools/time/event-countdown-client";

const TITLE = "Event Countdown | Toolzium";
const DESCRIPTION = "Create and track custom countdowns to your important events. Set timers for New Year, birthdays, holidays, and more.";
const PATH = "/tools/time/event-countdown";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Event Countdown",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EventCountdownClient />
    </>
  );
}
