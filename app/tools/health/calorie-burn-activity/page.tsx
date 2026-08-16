import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CalorieBurnActivityClient from "@/components/tools/health/calorie-burn-activity-client";

export const metadata = buildMetadata({
  title: "Calorie Burn by Activity Calculator — Free Exercise Burn Estimator",
  description:
    "Calculate exact calories burned across 30+ physical activities, sports, and exercise routines based on body weight and duration.",
  path: "/tools/health/calorie-burn-activity",
  keywords: [
    "calorie burn by activity calculator",
    "exercise calorie burn calculator",
    "calories burned calculator",
    "workout calorie estimator",
    "MET calorie calculator",
    "activity energy expenditure",
  ],
});

export default function CalorieBurnActivityPage() {
  const jsonLd = buildToolJsonLd({
    name: "Calorie Burn by Activity Calculator",
    description:
      "Calculate exact calories burned across 30+ physical activities, sports, and exercise routines based on body weight and duration.",
    path: "/tools/health/calorie-burn-activity",
    categoryName: "Health",
    categoryPath: "/tools/health",
    faqs: [
      {
        question: "What is a MET value in exercise science?",
        answer:
          "MET stands for Metabolic Equivalent of Task. 1 MET is the energy expended while resting quietly. An activity with a MET value of 8 burns 8 times more calories than resting.",
      },
      {
        question: "How accurate is this calorie burn calculator?",
        answer:
          "This tool uses standard scientific MET formulas from the Compendium of Physical Activities. Actual burn may vary slightly depending on muscle mass, age, and heart rate.",
      },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CalorieBurnActivityClient />
    </>
  );
}
