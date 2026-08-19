import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ElectricityMonitorClient from "@/components/tools/util/electricity-monitor-client";

const TITLE = "Electricity Usage Monitor | Toolzium";
const DESCRIPTION = "Calculate electricity costs for all your home appliances. See monthly bill estimate and identify energy-hungry devices. Enter your rate. Free.";
const PATH = "/tools/util/electricity-monitor";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Electricity Usage Monitor",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ElectricityMonitorClient />
    </>
  );
}
