import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import EmailSubjectGeneratorClient from "@/components/tools/writing/email-subject-generator-client";

const TITLE = "Email Subject Generator | Toolzium";
const DESCRIPTION = "Free online email subject generator generator and assistant. Fast, private, and 100% free forever.";
const PATH = "/tools/writing/email-subject-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Email Subject Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <EmailSubjectGeneratorClient />
    </>
  );
}
