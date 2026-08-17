import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SleepDebtClient from "@/components/tools/time/sleep-debt-client";

const TITLE = "Sleep Debt & Recovery Calculator | Toolzium";
const DESCRIPTION = "Calculate accumulated sleep debt over a 7-day week and recovery plan.";
const PATH = "/tools/time/sleep-debt";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Sleep Debt & Recovery Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SleepDebtClient />
    </>
  );
}
