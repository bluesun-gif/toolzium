import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ExpensesClient from "@/components/tools/travel/expenses-client";

const TITLE = "Travel Expense Tracker | Toolzium";
const DESCRIPTION = "Track expenses during a trip, manage budget and analyze spending by category.";
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
