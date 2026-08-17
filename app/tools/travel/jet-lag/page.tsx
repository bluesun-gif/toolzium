import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import JetLagClient from "@/components/tools/travel/jet-lag-client";

const TITLE = "Jet Lag Calculator | Toolzium";
const DESCRIPTION = "Calculate timezone differences, estimate jet lag severity, and get personalized recovery tips based on your travel direction.";
const PATH = "/tools/travel/jet-lag";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Jet Lag Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <JetLagClient />
    </>
  );
}
