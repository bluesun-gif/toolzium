import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CurrencyChartClient from "@/components/tools/finance/currency-chart-client";

const TITLE = "Currency Pair Chart | Toolzium";
const DESCRIPTION = "Visual currency pair comparison tool with simulated historical charts.";
const PATH = "/tools/finance/currency-chart";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Currency Pair Chart",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CurrencyChartClient />
    </>
  );
}
