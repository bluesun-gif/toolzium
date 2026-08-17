import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DistanceClient from "@/components/tools/travel/distance-client";

const TITLE = "Distance | Toolzium";
const DESCRIPTION = "Free online distance tool with instant calculation and privacy.";
const PATH = "/tools/travel/distance";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Distance",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <DistanceClient />
    </>
  );
}
