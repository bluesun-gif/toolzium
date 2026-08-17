import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import LunarCalendarClient from "@/components/tools/time/lunar-calendar-client";

const TITLE = "Lunar Calendar | Toolzium";
const DESCRIPTION = "View moon phases for any month and year.";
const PATH = "/tools/time/lunar-calendar";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Lunar Calendar",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <LunarCalendarClient />
    </>
  );
}
