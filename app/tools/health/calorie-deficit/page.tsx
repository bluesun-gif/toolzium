import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CalorieDeficitClient from "@/components/tools/health/calorie-deficit-client";

const TITLE = "Calorie Deficit & Goal Weight Date Estimator | Toolzium";
const DESCRIPTION = "Calculate your estimated target date to reach your goal weight based on your daily calorie deficit.";
const PATH = "/tools/health/calorie-deficit";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Calorie Deficit & Goal Weight Date Estimator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CalorieDeficitClient />
    </>
  );
}
