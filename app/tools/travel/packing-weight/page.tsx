import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PackingWeightClient from "@/components/tools/travel/packing-weight-client";

const TITLE = "Packing Weight Calculator | Toolzium";
const DESCRIPTION = "Calculate your luggage weight before traveling to avoid overweight baggage fees.";
const PATH = "/tools/travel/packing-weight";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Packing Weight Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PackingWeightClient />
    </>
  );
}
