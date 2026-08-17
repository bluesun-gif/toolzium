import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ExpenseCategoriesClient from "@/components/tools/finance/expense-categories-client";

const TITLE = "Expense Categorizer | Toolzium";
const DESCRIPTION = "Categorize and analyze expenses by category with charts and budget limits.";
const PATH = "/tools/finance/expense-categories";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Expense Categorizer",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ExpenseCategoriesClient />
    </>
  );
}
