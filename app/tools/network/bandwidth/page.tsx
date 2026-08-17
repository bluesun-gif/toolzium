import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BandwidthClient from "@/components/tools/network/bandwidth-client";

const TITLE = "Bandwidth Calculator | Toolzium";
const DESCRIPTION = "Calculate bandwidth requirements and transfer times.";
const PATH = "/tools/network/bandwidth";

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
      <BandwidthClient />
    </>
  );
}
