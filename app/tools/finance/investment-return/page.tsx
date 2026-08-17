import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import InvestmentReturnClient from "@/components/tools/finance/investment-return-client";

const TITLE = "Investment Return Calculator | Toolzium";
const DESCRIPTION = "Calculate investment returns over time with monthly contributions and compound interest.";
const PATH = "/tools/finance/investment-return";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Investment Return Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <InvestmentReturnClient />
    </>
  );
}
