import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ReadingTimeClient from "@/components/tools/text/reading-time-client";

const TITLE = "Reading Time | Toolzium";
const DESCRIPTION = "Free online reading time tool with instant calculation and privacy.";
const PATH = "/tools/text/reading-time";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Reading Time",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ReadingTimeClient />
    </>
  );
}
