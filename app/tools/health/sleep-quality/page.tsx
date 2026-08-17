import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SleepQualityClient from "@/components/tools/health/sleep-quality-client";

const TITLE = "Sleep Quality Analyzer | Toolzium";
const DESCRIPTION = "Analyze and score your sleep quality, calculate sleep efficiency, and track habits.";
const PATH = "/tools/health/sleep-quality";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Sleep Quality Analyzer",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SleepQualityClient />
    </>
  );
}
