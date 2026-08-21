import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import ReadabilityScoreClient from "@/components/tools/text/readability-score-client";

const TITLE = "Free Readability Score & Flesch-Kincaid Grade Level Analyzer";
const DESCRIPTION =
  "Calculate Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, and SMOG scores. Free online readability analyzer for bloggers, SEOs, and students.";
const PATH = "/tools/text/readability-score";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "readability score",
    "flesch kincaid calculator",
    "reading grade level",
    "flesch reading ease",
    "gunning fog index",
    "smog index",
    "coleman liau index",
    "text readability test",
    "seo readability checker",
    "free readability analyzer",
  ],
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Free Readability Score & Flesch-Kincaid Grade Level Analyzer",
    description: DESCRIPTION,
    path: PATH,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ReadabilityScoreClient />
    </>
  );
}
