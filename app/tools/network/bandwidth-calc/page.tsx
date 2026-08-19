import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BandwidthCalcClient from "@/components/tools/network/bandwidth-calc-client";

const TITLE = "Bandwidth Calculator | Toolzium";
const DESCRIPTION = "Calculate file download and upload times based on connection speed. Supports all bandwidth units — Mbps, Kbps, Gbps.";
const PATH = "/tools/network/bandwidth-calc";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Bandwidth Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <BandwidthCalcClient />
    </>
  );
}
