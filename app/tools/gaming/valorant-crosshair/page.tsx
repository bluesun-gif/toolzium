import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ValorantCrosshairClient from "@/components/tools/gaming/valorant-crosshair-client";

const TITLE = "Valorant Pro Crosshair Generator & Code Converter";
const DESCRIPTION = "Browse pro player Valorant crosshair codes (TenZ, Tarik, Demon1, Aspas) with 1-click Valorant import string copying.";
const PATH = "/tools/gaming/valorant-crosshair";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Valorant Pro Crosshair Generator & Code Converter",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ValorantCrosshairClient />
    </>
  );
}
