import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AgeCalculatorClient from "@/components/tools/time/age-calculator-client";

const TITLE = "Free Online Age Calculator - Exact Years, Months, Days & Next Birthday";
const DESCRIPTION =
  "Calculate exact age in years, months, weeks, days, hours, minutes, and seconds. Free online age calculator with next birthday countdown, zodiac sign, and life milestones.";
const PATH = "/tools/time/age";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "age calculator",
    "calculate my age",
    "how old am i",
    "chronological age calculator",
    "date of birth calculator",
    "birthday countdown",
    "age in days",
    "exact age calculator",
    "birthday milestone calculator",
  ],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Free Online Age Calculator & Birthday Milestone Suite",
    description: DESCRIPTION,
    path: PATH,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AgeCalculatorClient />
    </>
  );
}
