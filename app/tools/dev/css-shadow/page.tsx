import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CssShadowClient from "@/components/tools/dev/css-shadow-client";

const TITLE = "Css Shadow | Toolzium";
const DESCRIPTION = "Free online css shadow tool with instant calculation and privacy.";
const PATH = "/tools/dev/css-shadow";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Css Shadow",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CssShadowClient />
    </>
  );
}
