import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WeekNumberClient from "@/components/tools/time/week-number-client";

const TITLE = "Current Week Number Calculator | Toolzium";
const DESCRIPTION = "Check the current ISO week number, dates, and week breakdown for any year.";
const PATH = "/tools/time/weekno";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Current Week Number Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <WeekNumberClient />
    </>
  );
}
