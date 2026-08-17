import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import Budget503020Client from "@/components/tools/finance/budget-50-30-20-client";

const TITLE = "50/30/20 Rule Budget Calculator | Toolzium";
const DESCRIPTION = "Calculate your budget using the 50/30/20 rule to split income between needs, wants, and savings.";
const PATH = "/tools/finance/budget-50-30-20";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "50/30/20 Rule Budget Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <Budget503020Client />
    </>
  );
}
