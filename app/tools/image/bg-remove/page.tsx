import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import BgRemoveClient from "@/components/tools/image/bg-remove-client";

const TITLE = "Bg Remove | Toolzium";
const DESCRIPTION = "Free online bg remove tool with instant calculation and privacy.";
const PATH = "/tools/image/bg-remove";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Bg Remove",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <BgRemoveClient />
    </>
  );
}
