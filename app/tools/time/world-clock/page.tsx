import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WorldClockClient from "@/components/tools/time/world-clock-client";

const TITLE = "World Clock | Toolzium";
const DESCRIPTION = "View the current time in multiple cities and timezones simultaneously. Add any city — live, DST-aware world clock. Free, no signup.";
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
