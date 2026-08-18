import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import Base64Client from "@/components/tools/dev/base-converter-client";

const TITLE = "Base Converter | Toolzium";
const DESCRIPTION = "Free online base converter tool with instant calculation and privacy.";
const PATH = "/tools/dev/base-converter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Base Converter",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <Base64Client />
    </>
  );
}
