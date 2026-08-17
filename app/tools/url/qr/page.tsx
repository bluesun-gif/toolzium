import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import QrClient from "@/components/tools/url/qr-client";

const TITLE = "Qr | Toolzium";
const DESCRIPTION = "Free online qr tool with instant calculation and privacy.";
const PATH = "/tools/url/qr";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Qr",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <QrClient />
    </>
  );
}
