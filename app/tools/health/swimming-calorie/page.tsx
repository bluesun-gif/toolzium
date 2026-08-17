import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SwimmingCalorieClient from "@/components/tools/health/swimming-calorie-client";

const TITLE = "Swimming & Water Sports Calorie Calculator | Toolzium";
const DESCRIPTION = "Calculate calories burned during swimming, water polo, kayaking, and other water sports based on your weight and duration.";
const PATH = "/tools/health/swimming-calorie";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Swimming & Water Sports Calorie Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SwimmingCalorieClient />
    </>
  );
}
