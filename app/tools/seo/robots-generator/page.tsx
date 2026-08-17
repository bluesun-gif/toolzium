import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RobotsGeneratorClient from "@/components/tools/seo/robots-generator-client";

const TITLE = "Robots Generator | Toolzium";
const DESCRIPTION = "Free online robots generator tool with instant calculation and privacy.";
const PATH = "/tools/seo/robots-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Robots Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <RobotsGeneratorClient />
    </>
  );
}
