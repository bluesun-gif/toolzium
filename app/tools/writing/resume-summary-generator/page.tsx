import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ResumeSummaryGeneratorClient from "@/components/tools/writing/resume-summary-generator-client";

const TITLE = "Resume Summary Generator | Toolzium";
const DESCRIPTION = "Free online resume summary generator generator and assistant. Fast, private, and 100% free forever.";
const PATH = "/tools/writing/resume-summary-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Resume Summary Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ResumeSummaryGeneratorClient />
    </>
  );
}
