import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ExpenseTrackerClient from "@/components/tools/office/expense-tracker-client";

const TITLE = "Expense Tracker | Toolzium";
const DESCRIPTION = "Track your daily expenses, categorize spending, and view monthly summaries with our free online expense tracker.";
const PATH = "/tools/office/expense-tracker";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Expense Tracker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ExpenseTrackerClient />
    </>
  );
}
