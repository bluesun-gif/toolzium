import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DateDifferenceClient from "@/components/tools/calc/date-difference-client";

const TITLE = "Date Diff | Toolzium";
const DESCRIPTION = "Free online date diff tool with instant calculation and privacy.";
const PATH = "/tools/calc/date-diff";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Date Diff",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <DateDifferenceClient />
    </>
  );
}
