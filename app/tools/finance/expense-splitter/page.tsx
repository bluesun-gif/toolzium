import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ExpenseSplitterClient from "@/components/tools/finance/expense-splitter-client";

const TITLE = "Expense Splitter | Toolzium";
const DESCRIPTION = "Split expenses among a group and calculate who owes whom.";
const PATH = "/tools/finance/expense-splitter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Expense Splitter",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ExpenseSplitterClient />
    </>
  );
}
