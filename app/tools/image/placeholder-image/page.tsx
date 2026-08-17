import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PlaceholderImageClient from "@/components/tools/image/placeholder-image-client";

const TITLE = "Placeholder Image | Toolzium";
const DESCRIPTION = "Free online placeholder image tool with instant calculation and privacy.";
const PATH = "/tools/image/placeholder-image";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Placeholder Image",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PlaceholderImageClient />
    </>
  );
}
