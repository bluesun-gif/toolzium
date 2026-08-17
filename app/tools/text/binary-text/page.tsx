import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BinaryTextClient from "@/components/tools/text/binary-text-client";

const TITLE = "Binary Text | Toolzium";
const DESCRIPTION = "Free online binary text tool with instant calculation and privacy.";
const PATH = "/tools/text/binary-text";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Binary Text",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <BinaryTextClient />
    </>
  );
}
