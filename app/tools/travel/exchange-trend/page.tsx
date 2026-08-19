import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ExchangeTrendClient from "@/components/tools/travel/exchange-trend-client";

const TITLE = "Currency Exchange Trend | Toolzium";
const DESCRIPTION = "Analyze currency exchange rate trends over time. See weekly, monthly, and yearly trends with bullish/bearish signals. Free.";
const PATH = "/tools/travel/exchange-trend";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Currency Rate Trend Comparison Table",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ExchangeTrendClient />
    </>
  );
}
