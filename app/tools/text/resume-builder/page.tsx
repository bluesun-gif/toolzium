import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ResumeBuilderClient from "@/components/tools/text/resume-builder-client";

const TITLE = "Markdown Resume Builder | Toolzium";
const DESCRIPTION = "Build a professional resume in markdown format with live preview and download options.";
const PATH = "/tools/text/resume-builder";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Markdown Resume Builder",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ResumeBuilderClient />
    </>
  );
}
