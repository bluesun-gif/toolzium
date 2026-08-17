import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import RpsClient from "@/components/tools/fun/rps-client";

const TITLE = "Rps | Toolzium";
const DESCRIPTION = "Free online rps tool with instant calculation and privacy.";
const PATH = "/tools/fun/rps";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Rps",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <RpsClient />
    </>
  );
}
