import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TextStatsClient from "@/components/tools/text/text-stats-client";

const TITLE = "Text Statistics & Analyzer | Toolzium";
const DESCRIPTION = "Advanced text analysis tool for word count, readability score, reading time, and lexical density.";
const PATH = "/tools/text/text-stats";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Text Statistics & Analyzer",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TextStatsClient />
    </>
  );
}
