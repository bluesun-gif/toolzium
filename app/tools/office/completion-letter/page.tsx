import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CompletionLetterClient from "@/components/tools/office/completion-letter-client";

const TITLE = "Work Completion Letter Generator | Toolzium";
const DESCRIPTION = "Generate formal Work Completion Certificates & Project Sign-off Letters.";
const PATH = "/tools/office/completion-letter";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Work Completion Letter Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CompletionLetterClient />
    </>
  );
}
