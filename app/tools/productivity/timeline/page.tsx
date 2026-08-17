import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TimelineClient from "@/components/tools/productivity/timeline-client";

const TITLE = "Project Timeline | Toolzium";
const DESCRIPTION = "Visual project timeline and Gantt chart planner to manage your tasks.";
const PATH = "/tools/productivity/timeline";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Project Timeline",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TimelineClient />
    </>
  );
}
