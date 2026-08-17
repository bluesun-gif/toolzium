import JsonLd from "@/components/seo/json-ld";
import { buildMetadata, buildToolJsonLd } from "@/lib/seo";
import CookingTimerClient from "@/components/tools/time/cooking-timer-client";

const TITLE = "Cooking Timer | Toolzium";
const DESCRIPTION = "Multiple simultaneous cooking timers with presets and visual alerts.";
const PATH = "/tools/time/cooking-timer";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH
});

export default function Page() {
  const jsonLd = buildToolJsonLd({
    name: "Cooking Timer",
    description: DESCRIPTION,
    path: PATH
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <CookingTimerClient />
    </>
  );
}
