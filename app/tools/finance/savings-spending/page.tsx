import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SavingsSpendingClient from "@/components/tools/finance/savings-spending-client";

const TITLE = "Savings vs Spending Analyzer | Toolzium";
const DESCRIPTION = "Compare saving vs spending habits.";
const PATH = "/tools/finance/savings-spending";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Savings vs Spending Analyzer",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SavingsSpendingClient />
    </>
  );
}
