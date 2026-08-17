import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BodyFatClient from "@/components/tools/health/body-fat-client";

const TITLE = "Body Fat Calculator | Toolzium";
const DESCRIPTION = "Estimate your body fat percentage, lean mass, and fat mass using the US Navy method.";
const PATH = "/tools/health/body-fat";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Body Fat Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <BodyFatClient />
    </>
  );
}
