import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CoverLetterClient from "@/components/tools/office/cover-letter-client";

const TITLE = "Cover Letter Builder | Toolzium";
const DESCRIPTION = "Build professional cover letters with templates and live preview.";
const PATH = "/tools/office/cover-letter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Cover Letter Builder",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CoverLetterClient />
    </>
  );
}
