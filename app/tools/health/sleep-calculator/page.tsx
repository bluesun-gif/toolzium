import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SleepCalculatorClient from "@/components/tools/health/sleep-calculator-client";

const TITLE = "Sleep Calculator — Optimal Wake & Bedtimes | Toolzium";
const DESCRIPTION = "Calculate the best times to go to sleep or wake up based on 90-minute sleep cycles. Feel refreshed and avoid grogginess with our free sleep calculator.";
const PATH = "/tools/health/sleep-calculator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Sleep Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SleepCalculatorClient />
    </>
  );
}
