import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CalorieBurnClient from "@/components/tools/health/calorie-burn-client";

const TITLE = "Calorie Burn Calculator | Toolzium";
const DESCRIPTION = "Calculate calories burned during various physical activities and exercises based on your body weight and duration.";
const PATH = "/tools/health/calorie-burn";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Calorie Burn Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CalorieBurnClient />
    </>
  );
}
