import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import AtsCheckerClient from "@/components/tools/ai/ats-checker-client";

const TITLE = "AI Resume & ATS Compatibility Checker — Free Resume Score Tool | Toolzium";
const DESCRIPTION = "Calculate your ATS match score against target job descriptions, find missing keywords, and optimize your resume to land interviews.";
const PATH = "/tools/ai/ats-checker";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "AI Resume & ATS Compatibility Checker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <AtsCheckerClient />
    </>
  );
}
