import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ImageToPdfClient from "@/components/tools/image/image-to-pdf-client";

const TITLE = "Image To Pdf | Toolzium";
const DESCRIPTION = "Free online image to pdf tool with instant calculation and privacy.";
const PATH = "/tools/image/image-to-pdf";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Image To Pdf",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ImageToPdfClient />
    </>
  );
}
