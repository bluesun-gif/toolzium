import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WorldClockClient from "@/components/tools/time/world-clock-client";

const TITLE = "World Clock | Toolzium";
const DESCRIPTION = "Display current time in multiple timezones simultaneously. Live updating world clock.";
const PATH = "/tools/time/world-clock";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "World Clock",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <WorldClockClient />
    </>
  );
}
