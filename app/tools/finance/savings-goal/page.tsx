import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SavingsGoalClient from "@/components/tools/finance/savings-goal-client";

const TITLE = "Savings Goal | Toolzium";
const DESCRIPTION = "Free online savings goal tool with instant calculation and privacy.";
const PATH = "/tools/finance/savings-goal";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Savings Goal",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SavingsGoalClient />
    </>
  );
}
