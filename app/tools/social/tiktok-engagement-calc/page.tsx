import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TiktokCalcClient from "@/components/tools/social/tiktok-calc-client";

const TITLE = "TikTok Engagement Rate Calculator | Toolzium";
const DESCRIPTION = "Calculate TikTok engagement rate based on views, likes, comments, and shares.";
const PATH = "/tools/social/tiktok-engagement-calc";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "TikTok Engagement Rate Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TiktokCalcClient />
    </>
  );
}
