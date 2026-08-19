import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SpeedConverterClient from "@/components/tools/network/speed-converter-client";

const TITLE = "Speed Converter | Toolzium";
const DESCRIPTION = "Convert speed units instantly — mph to km/h, m/s, knots, Mach number and more. Real-time speed conversion with precise values.";
const PATH = "/tools/network/speed-converter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Network Speed Converter",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SpeedConverterClient />
    </>
  );
}
