import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import GoldPriceTrackerClient from "@/components/tools/finance/gold-price-tracker-client";

const TITLE = "Gold Price Tracker | Toolzium";
const DESCRIPTION = "Free online gold price tracker tool with instant calculation and privacy.";
const PATH = "/tools/finance/gold-price-tracker";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Gold Price Tracker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <GoldPriceTrackerClient />
    </>
  );
}
