import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MealPrepClient from "@/components/tools/productivity/meal-prep-client";

const TITLE = "Weekly Meal Prep & Grocery Planner | Toolzium";
const DESCRIPTION = "Plan your weekly meals and generate a categorized grocery list automatically.";
const PATH = "/tools/productivity/meal-prep";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Weekly Meal Prep & Grocery Planner",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MealPrepClient />
    </>
  );
}
