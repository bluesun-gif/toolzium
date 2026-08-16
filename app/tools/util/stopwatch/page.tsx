import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import StopwatchClient from "@/components/tools/util/stopwatch-client";
import { siteURL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Stopwatch",
  description: "Online stopwatch with millisecond precision, lap recording, and keyboard shortcuts. Start, stop, reset, and record split times. Free stopwatch timer for workouts, cooking, and productivity.",
  path: "/tools/util/stopwatch",
  keywords: ["recording", "record", "with", "precision", "stopwatch", "online", "stop", "reset", "millisecond", "start", "shortcuts", "keyboard"],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Stopwatch",
    description: "Online stopwatch with millisecond precision, lap recording, and keyboard shortcuts. Start, stop, reset, and record split times. Free stopwatch timer for workouts, cooking, and productivity.",
    path: "/tools/util/stopwatch",
    categoryName: "Util",
    categoryPath: "/tools/util",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <JsonLd data={jsonLd as any} />
      <StopwatchClient />
    
      <RelatedTools currentToolUrl="/tools/util/stopwatch" />
</div>
  );
}
