import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CoinFlipClient from "@/components/tools/util/coin-flip-client";

const TITLE = "Coin Flip | Toolzium";
const DESCRIPTION = "Free online coin flip tool with instant calculation and privacy.";
const PATH = "/tools/util/coin-flip";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Coin Flip",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CoinFlipClient />
    </>
  );
}
