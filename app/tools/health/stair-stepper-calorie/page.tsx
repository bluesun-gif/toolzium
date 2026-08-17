import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import StairStepperCalorieClient from "@/components/tools/health/stair-stepper-calorie-client";

const TITLE = "Stair Stepper & StepMill Calorie Calculator | Toolzium";
const DESCRIPTION = "Calculate total calories burned on stair steppers, StepMill gym machines.";
const PATH = "/tools/health/stair-stepper-calorie";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Stair Stepper & StepMill Calorie Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <StairStepperCalorieClient />
    </>
  );
}
