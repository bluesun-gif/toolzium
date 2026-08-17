import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MealPlannerClient from "@/components/tools/health/meal-planner-client";

const TITLE = "Meal Planner & Calorie Target | Toolzium";
const DESCRIPTION = "Plan meals and track macros.";
const PATH = "/tools/health/meal-planner";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Meal Planner & Calorie Target",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MealPlannerClient />
    </>
  );
}
