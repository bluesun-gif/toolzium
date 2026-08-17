import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PdfToImageClient from "@/components/tools/util/pdf-to-image-client";

const TITLE = "Pdf To Image | Toolzium";
const DESCRIPTION = "Free online pdf to image tool with instant calculation and privacy.";
const PATH = "/tools/util/pdf-to-image";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Pdf To Image",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PdfToImageClient />
    </>
  );
}
