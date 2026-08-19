import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ExpensesClient from "@/components/tools/travel/expenses-client";

const TITLE = "Travel Expense Tracker | Toolzium";
const DESCRIPTION = "Track travel expenses in multiple currencies. Log spending by category, auto-convert to home currency, and export reports. Free.";
const PATH = "/tools/travel/expenses";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Travel Expense Tracker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ExpensesClient />
    </>
  );
}
