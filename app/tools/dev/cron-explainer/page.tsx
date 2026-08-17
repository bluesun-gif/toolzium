import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CronExplainerClient from "@/components/tools/dev/cron-explainer-client";

const TITLE = "Cron Explainer | Toolzium";
const DESCRIPTION = "Translate cron expressions into human-readable text and view upcoming scheduled run times.";
const PATH = "/tools/dev/cron-explainer";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Cron Explainer",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CronExplainerClient />
    </>
  );
}
