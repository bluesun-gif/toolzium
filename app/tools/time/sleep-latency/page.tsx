import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SleepLatencyClient from "@/components/tools/time/sleep-latency-client";

const TITLE = "Sleep Latency & Alarm Clock | Toolzium";
const DESCRIPTION = "Sleep latency & sleep efficiency analyzer with custom alarm calculator.";
const PATH = "/tools/time/sleep-latency";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Sleep Latency & Alarm Clock",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SleepLatencyClient />
    </>
  );
}
