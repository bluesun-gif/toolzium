import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import FaviconGeneratorClient from "@/components/tools/image/favicon-generator-client";

const TITLE = "Favicon & App Icon Generator — Convert Image to Favicon.ico | Toolzium";
const DESCRIPTION = "Generate website favicons, Apple Touch icons, Android PWA icons, and multi-resolution favicon.ico files online. Download ready-to-use icon zip packages with HTML head code.";
const PATH = "/tools/image/favicon-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Favicon & App Icon Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <FaviconGeneratorClient />
    </>
  );
}
