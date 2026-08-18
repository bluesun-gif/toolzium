import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CronExplainerClient from "@/components/tools/dev/cron-generator-client";

const TITLE = "Cron Expression Generator — Free Online Tool | Toolzium";
const DESCRIPTION = "Easily generate, parse, and explain cron expressions with our visual builder. See human-readable descriptions and next scheduled run times.";
const PATH = "/tools/dev/cron-generator";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Cron Expression Generator",
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
