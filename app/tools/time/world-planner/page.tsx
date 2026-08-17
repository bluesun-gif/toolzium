import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import WorldPlannerClient from "@/components/tools/time/world-planner-client";

const TITLE = "World Clock & Meeting Planner | Toolzium";
const DESCRIPTION = "Compare times across multiple world cities to find ideal meeting slots.";
const PATH = "/tools/time/world-planner";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "World Clock & Meeting Planner",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <WorldPlannerClient />
    </>
  );
}
