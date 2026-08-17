import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import NutritionLabelClient from "@/components/tools/health/nutrition-label-client";

const TITLE = "Nutrition Label Maker | Toolzium";
const DESCRIPTION = "Create FDA-style nutrition labels with automatically calculated daily values.";
const PATH = "/tools/health/nutrition-label";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Nutrition Label Maker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <NutritionLabelClient />
    </>
  );
}
