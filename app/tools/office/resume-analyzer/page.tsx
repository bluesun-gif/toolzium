import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ResumeAnalyzerClient from "@/components/tools/office/resume-analyzer-client";

const TITLE = "Resume Word Counter & Analyzer | Toolzium";
const DESCRIPTION = "Analyze your resume or CV for word count, keywords, readability, and weak words.";
const PATH = "/tools/office/resume-analyzer";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Resume Word Counter & Analyzer",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ResumeAnalyzerClient />
    </>
  );
}
