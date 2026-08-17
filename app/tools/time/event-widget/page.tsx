import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EventWidgetClient from "@/components/tools/time/event-widget-client";

const TITLE = "Event Countdown Widget Creator | Toolzium";
const DESCRIPTION = "Create customizable event countdown widgets and embed them anywhere.";
const PATH = "/tools/time/event-widget";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Event Countdown Widget Creator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EventWidgetClient />
    </>
  );
}
