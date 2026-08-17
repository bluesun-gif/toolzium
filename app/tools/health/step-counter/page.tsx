import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import StepCounterClient from "@/components/tools/health/step-counter-client";

const TITLE = "Step Counter & Pedometer Log | Toolzium";
const DESCRIPTION = "Track your daily steps, set goals, and monitor calories burned and distance walked over time.";
const PATH = "/tools/health/step-counter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Step Counter & Pedometer Log",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <StepCounterClient />
    </>
  );
}
