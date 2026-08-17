import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ColorSwapperClient from "@/components/tools/image/color-swapper-client";

const TITLE = "Image Color Swapper | Toolzium";
const DESCRIPTION = "Swap or replace specific colors in your images instantly.";
const PATH = "/tools/image/color-swapper";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Image Color Swapper",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ColorSwapperClient />
    </>
  );
}
