import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import OkrPlannerClient from "@/components/tools/productivity/okr-planner-client";

const TITLE = "OKR (Objectives & Key Results) Planner | Toolzium";
const DESCRIPTION = "Set and track your goals with this structured OKR planning tool. Monitor progress for objectives and key results.";
const PATH = "/tools/productivity/okr-planner";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "OKR (Objectives & Key Results) Planner",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <OkrPlannerClient />
    </>
  );
}
