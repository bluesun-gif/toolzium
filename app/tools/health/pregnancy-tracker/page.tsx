import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import PregnancyTrackerClient from "@/components/tools/health/pregnancy-tracker-client";

const TITLE = "Pregnancy Tracker | Toolzium";
const DESCRIPTION = "Track pregnancy milestones, due date, and baby size.";
const PATH = "/tools/health/pregnancy-tracker";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Pregnancy Tracker",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PregnancyTrackerClient />
    </>
  );
}
