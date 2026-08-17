import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import StopwatchClient from "@/components/tools/util/stopwatch-client";

const TITLE = "Stopwatch | Toolzium";
const DESCRIPTION = "Free online stopwatch tool with instant calculation and privacy.";
const PATH = "/tools/util/stopwatch";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Stopwatch",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <StopwatchClient />
    </>
  );
}
