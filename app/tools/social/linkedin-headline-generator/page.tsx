import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import LinkedinHeadlineClient from "@/components/tools/social/linkedin-headline-client";

const TITLE = "LinkedIn Viral Post & Headline Hook Generator";
const DESCRIPTION = "Generate high-converting LinkedIn profile headlines, B2B hooks, and viral storytelling formats with live AI inference.";
const PATH = "/tools/social/linkedin-headline-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "LinkedIn Viral Post & Headline Hook Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <LinkedinHeadlineClient />
    </>
  );
}
