import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PlaceholderGeneratorClient from "@/components/tools/image/placeholder-generator-client";

const TITLE = "Placeholder Generator | Toolzium";
const DESCRIPTION = "Free online placeholder generator tool with instant calculation and privacy.";
const PATH = "/tools/image/placeholder-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Placeholder Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PlaceholderGeneratorClient />
    </>
  );
}
