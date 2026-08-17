import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import LetterTemplateClient from "@/components/tools/office/letter-template-client";

const TITLE = "Letter Template Generator | Toolzium";
const DESCRIPTION = "Generate formal letter templates including resignation, recommendation, and complaint.";
const PATH = "/tools/office/letter-template";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Letter Template Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <LetterTemplateClient />
    </>
  );
}
