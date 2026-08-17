import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import SymptomDiaryClient from "@/components/tools/health/symptom-diary-client";

const TITLE = "Symptom Diary | Toolzium";
const DESCRIPTION = "Track your daily symptoms with severity, categories, and trends. Save data locally.";
const PATH = "/tools/health/symptom-diary";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Symptom Diary",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <SymptomDiaryClient />
    </>
  );
}
