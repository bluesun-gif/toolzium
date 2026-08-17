import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BudgetTemplateClient from "@/components/tools/finance/budget-template-client";

const TITLE = "Budget Template Generator | Toolzium";
const DESCRIPTION = "Generate monthly budget templates based on income and popular budgeting rules like 50/30/20.";
const PATH = "/tools/finance/budget-template";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Budget Template Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <BudgetTemplateClient />
    </>
  );
}
