import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import DueDateClient from "@/components/tools/health/due-date-client";

const TITLE = "Pregnancy Due Date Calculator | Toolzium";
const DESCRIPTION = "Calculate your estimated pregnancy due date based on your last menstrual period.";
const PATH = "/tools/health/due-date";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Pregnancy Due Date Calculator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <DueDateClient />
    </>
  );
}
