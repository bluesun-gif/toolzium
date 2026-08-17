import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import MlbbNameClient from "@/components/tools/gaming/mlbb-name-client";

const TITLE = "Mobile Legends (MLBB) Fancy Name & Symbol Generator";
const DESCRIPTION = "Generate cool, aesthetic Japanese Kanji, Gothic symbols, squad tags, and fancy font nicknames for Mobile Legends Bang Bang.";
const PATH = "/tools/gaming/mlbb-name-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Mobile Legends (MLBB) Fancy Name & Symbol Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MlbbNameClient />
    </>
  );
}
