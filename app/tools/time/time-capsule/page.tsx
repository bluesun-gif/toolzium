import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import TimeCapsuleClient from "@/components/tools/time/time-capsule-client";

const TITLE = "Time Capsule Message | Toolzium";
const DESCRIPTION = "Create digital time capsule messages locked until a future date.";
const PATH = "/tools/time/time-capsule";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Time Capsule Message",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TimeCapsuleClient />
    </>
  );
}
