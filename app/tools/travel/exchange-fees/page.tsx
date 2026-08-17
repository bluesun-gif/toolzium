import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ExchangeFeesClient from "@/components/tools/travel/exchange-fees-client";

const TITLE = "Currency Exchange Fee & Hidden Markup Calculator | Toolzium";
const DESCRIPTION = "Uncover hidden exchange rate markups and total foreign transaction fees when converting currency.";
const PATH = "/tools/travel/exchange-fees";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Currency Exchange Fee & Hidden Markup Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ExchangeFeesClient />
    </>
  );
}
