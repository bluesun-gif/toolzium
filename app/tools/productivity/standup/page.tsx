import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import StandupClient from "@/components/tools/productivity/standup-client";

const TITLE = "Daily Standup Generator | Toolzium";
const DESCRIPTION = "Generate and format your daily standup reports easily. Organize your tasks, blockers, and achievements for team meetings.";
const PATH = "/tools/productivity/standup";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Daily Standup Generator",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <StandupClient />
    </>
  );
}
